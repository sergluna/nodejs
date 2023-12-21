const fs = require("fs");
const http = require("http");
const path = require("path");
const { json } = require("stream/consumers");
const url = require("url");

//////////////////////////////////////////
// FILES FS
// // blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textIn);

// const textOut = `A little information about avocado: ${textIn}. \nCreated by Sergio on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File Written!");

// nonblocking, asynchronous
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written ");
//       });
//     });
//   });
// });

// console.log("Will read file");

/////////////////////////////////////////////////////////
// SERVER

// __dirname is the same as ./ but with temporal literal it is easier
// synchrounos code but its fine becaus eits top level and only get ran once
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// using parse to turn json into readable information
const dataJSON = JSON.parse(data);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the overvierw");
  } else if (pathName === "/product") {
    res.end("This is the product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});

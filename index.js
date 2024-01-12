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
// synchrounos code but its fine because its top level and only get ran once

// Function for replacing the placeholder in HTML Templates with the data from the JSON file
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{productName}/g, product.productName);
  output = output.replace(/{image}/g, product.image);
  output = output.replace(/{from}/g, product.from);
  output = output.replace(/{nutrients}/g, product.nutrients);
  output = output.replace(/{quantity}/g, product.quantity);
  output = output.replace(/{id}/g, product.id);
  output = output.replace(/{description}/g, product.description);
  output = output.replace(/{price}/g, product.price);

  if (!product.organic)
    output = output.replace(/{not_organic}/g, "not-organic");
  return output;
};

// Loading the HTML Templates
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

// using parse to turn json into readable information
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObjct = JSON.parse(data);

// Creating a server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page Route
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObjct
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{product_cards}", cardsHtml);
    res.end(output);

    // Prouct Page Route
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObjct[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not Found Page
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

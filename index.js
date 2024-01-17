// Loading in packages and the custom module, replaceTemplate

const fs = require("fs");
const http = require("http");
const path = require("path");
const { json } = require("stream/consumers");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

// Loading the HTML Element Templates

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

// Using parse to turn JSON data file into readable information
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObjct = JSON.parse(data);

// Creating a server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Landing Page Route
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

    // Page Not Found Route
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

const fs = require("fs");
const http = require("http");
const path = require("path");
const { json } = require("stream/consumers");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const slugify = require("slugify");

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

const slugs = dataObjct.map((el) => slugify(el.productName, { lower: true }));
console.log(slugs);

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

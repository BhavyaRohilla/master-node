const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Bhavya");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

const server = require("http").createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received!");
});

server.on("request", (req, res) => {
  console.log("Another request received!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});

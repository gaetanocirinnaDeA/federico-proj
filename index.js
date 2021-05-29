const express = require("express");
const app = express();
const PORT = 8080;

const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Public folder
app.use(express.static("dist"));

// start the server
app.listen(PORT, () => {
    console.log("app started");
});

// route our app
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/dist/index.html");
});

server.use(middlewares);
server.use(router);
server.listen(3000, () => {
    console.log("JSON Server is running");
});

server.get("/posts", (req, res) => {
    res.jsonp(req.query);
});

const http = require("http");
const express = require("express");
const fetch = require("./fetchLib.js");
const path = require("path");
const { port, host } = require("./config.json");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/pages/menu.html"))
);

app.get("/index", (req, res) => {
  fetch("http://localhost:3030/person/", { mode: "cors" })
    .then((data) => data.json())
    .then(
      (result) => res.json(result) + console.log("indexSpa, get /" + result)
    )
    .catch((err) => res.json(err) + console.log(err));
});

app.get("/getOne", (req, res) => {
  const number = req.body.number;
  if (number && number.length > 0) {
    fetch(`http://localhost:3030/person/:id`, { mode: "cors" })
      .then((data) => data.json())
      .then(
        (result) =>
          res.json(result) + console.log("indexSpa, getOne /" + result)
      )
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty number", type: "error" });
  }
});

app.post("/add", (req, res) => {
  const obj = req.body;
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  fetch("http://localhost:3030/person/", options)
    .then((data) => data.json())
    .then(
      (result) => res.json(result) + console.log("indexSpa, add /" + result)
    )
    .catch((err) => res.json(err));
});

app.put("/update", (req, res) => {
  const obj = req.body;
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  fetch(`http://localhost:3030/person/:id`, options)
    .then((data) => data.json())
    .then(
      (result) => res.json(result) + console.log("indexSpa, update /" + result)
    )
    .catch((err) => res.json(err));
});

app.delete("/remove", (req, res) => {
  const number = req.body.number;
  if (number && number.length > 0) {
    fetch(`http://localhost:3030/person/:id`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((data) => data.json())
      .then(
        (result) =>
          res.json(result) + console.log("indexSpa, remove /" + result)
      )
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty number", type: "error" });
  }
});

// app.all("*", (req, res) => res.json("not supported"));

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} running...`)
);

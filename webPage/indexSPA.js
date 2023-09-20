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
    .then((result) => res.json(result))
    .catch((err) => res.json(err) + console.log(err));
});

app.post("/getOne", (req, res) => {
  let id = req.body.number;
  if (id && id.length > 0) {
    fetch(`http://localhost:3030/person/${id}`, { mode: "cors" })
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty number", type: "error" });
  }
});

app.post("/add", (req, res) => {
  const obj = JSON.stringify(req.body);
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: obj,
  };

  fetch("http://localhost:3030/person/", options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update", (req, res) => {
  const obj = req.body;
  const id = req.body.number;
  const options = {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  fetch(`http://localhost:3030/person/${id}`, options)
    .then((data) => data.json())
    .then((result) => res.json(result))
    .catch((err) => console.log("this is the error " + err) + res.json(err));
});

app.delete("/remove", (req, res) => {
  const id = req.body.number;
  if (id && id.length > 0) {
    fetch(`http://localhost:3030/person/${id}`, {
      method: "DELETE",
      mode: "cors",
    })
      .then((data) => data.json())
      .then((result) => res.json(result))
      .catch((err) => res.json(err));
  } else {
    res.json({ message: "empty number", type: "error" });
  }
});

server.listen(port, host, () =>
  console.log(`Server ${host}:${port} running...`)
);

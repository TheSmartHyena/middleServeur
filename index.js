const mysql = require("mysql");
const express = require("express");
const app = express();
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

const axios = require("axios").default;

const createUserUrl = "http://51.75.28.97:8080/Poivrometre_war/services/create";
const connectUrl = "http://51.75.28.97:8080/Poivrometre_war/services/connect";
const addConsoUrl = "http://51.75.28.97:8080/Poivrometre_war/services/conso";
const getTauxUrl = "http://51.75.28.97:8080/Poivrometre_war/services/taux";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  console.log("pouet pouet mdr");

  res.send("Hello Worlddddddd");
});

app.post("/register", async function(req, res) {
  const result = await createUser(req.body);
  res.json({ success: result });
});

app.post("/login", async function(req, res) {
  //console.log("poney 1");
  console.log(req.body);
  const result = await connectUser(req.body);
  console.log(result);
  res.json({ clef: result });
});

app.post("/conso", async function(req, res) {
  let data = req.body;
  data.id_boisson = Number(data.id_boisson);
  console.log(data);
  const result = await addCOnso(req.body);
  res.json({ success: result });
});

app.post("/getTaux", async function(req, res) {
  console.log(req.body);
  const result = await getTaux(req.body);
  res.json({ taux: result });
});

async function createUser(toSend) {
  const result = await axios.post(createUserUrl, toSend);
  //console.log(result.data);
  return result.data;
}

async function connectUser(toSend) {
  const result = await axios.post(connectUrl, toSend);
  //console.log(result.data);
  return result.data;
}

async function addCOnso(toSend) {
  const result = await axios.post(addConsoUrl, toSend);
  console.log(result.data);
  return result.data;
}

async function getTaux(toSend) {
  console.log(toSend);
  const result = await axios.post(getTauxUrl, toSend);
  console.log(result.data);
  return result.data;
}

app.listen(3000);

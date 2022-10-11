const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const rowres = await db.getAllData();
  console.log(rowres);
  res.render("home", { todoTasks: rowres });
});

app.post("/", async (req, res) => {
  const taskInput = req.body.taskInput;
  if (taskInput) {
    const rowres = await db.insertData(taskInput);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.get("/del/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log("No id to be deleted");
    return;
  } else {
    const res = await db.deleteDataForId(id);
  }
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

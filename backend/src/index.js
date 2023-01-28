const express = require("express");
const db = require("mongoose");
const movies = require("./database/model");
const app = new express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.listen(1234, () => console.log("server ON"));
db.set("strictQuery", true);
db.connect("mongodb://127.0.0.1/Framed").then(() =>
  console.log("connected to DB")
);

app.post("/salvar", async (req, res) => {
  const { number, ptTitle, enTitle } = req.body;

  await movies.create({
    number,
    ptTitle,
    enTitle,
  });

  return res.json({ message: `Movie ${enTitle} was inserted` });
});

app.get("/movies", async (req, res) => {
  const allMovies = await movies.find().select({ _id: 0 });
  res.json(allMovies);
});

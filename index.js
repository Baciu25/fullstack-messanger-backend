import dotenv from "dotenv";
dotenv.config();
import express from "express";
import messages from "./db.js";
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/messages", (req, res) => res.json(messages));
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

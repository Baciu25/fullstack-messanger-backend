import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const messages = [];
const app = express();

app.use(express.static("public"));

app.use(cors());
app.use(express.json());

import { v4 as uuidv4 } from "uuid";

app.get("/messages", (req, res) => {
  res.status(200).json(messages);
});

app.post("/messages", (req, res) => {
  if (!req.body.username || !req.body.content) {
    res.status(400).send("username and content are requiered");
  } else {
    const newDoc = { ...req.body, id: uuidv4(), created_at: Date.now() };
    console.log("newDoc created", newDoc);
    messages.push(newDoc);
    res.status(201).json(newDoc);
  }
});

app.put("/messages/:id", (req, res) => {
  const { id } = req.params;
  console.log("hello");
  const indexOfId = messages.findIndex((message) => message.id == id);
  messages[indexOfId].content = req.body.content;
  res.status(200).json(messages[indexOfId]);
});

app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const indexOfId = messages.findIndex((message) => message.id == id);
  messages.splice(indexOfId, 1);
  res.status(204).send("message deleted");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid'
import cors from "cors";
import axios from "axios";




const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = uuidv4();  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://event-bus-srv:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('vX')
  console.log("Listening on 4000");
});

import express from "express";
import dotenv from "dotenv";
import Route from "./route/route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(Route);

app.get("/", (request, response) => {
  response.status(200).send("<h1>RatingBlog</h1>");
});

app.listen(PORT, () => {
  console.log(`Server ruuning on http://localhost:${PORT}`);
});

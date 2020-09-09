import express from "express";
import { rootHandler } from "./data.parser";

const app = express();
const port = process.env.PORT || "8000";

app.get("/", rootHandler);

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});

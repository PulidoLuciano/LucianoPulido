import "dotenv/config";
import express from "express";
import cors from "cors";

require("dotenv").config()

const app = express();
app.use(cors());
const port = process.env.PORT;

app.get("/", (request, response) => { 
    response.status(200).send("Hello World");
  }); 

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})
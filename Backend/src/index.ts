import "dotenv/config";
import express from "express";
import cors from "cors";
import ROUTERS from "./routes/ROUTERS";

require("dotenv").config()

const app = express();
app.use(cors());
const port = process.env.PORT;

ROUTERS.forEach((route) => {
  app.use(route.path, route.router);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
})
import express from "express";
import "dotenv/config.js";

import { Postgreshelper } from "./src/db/postgres/helper.js";

const app = express();

app.get("/", async (req, res) => {
    const results = await Postgreshelper.query("SELECT * FROM users;");

    res.send(JSON.stringify(results));
});

app.listen(3000, () => console.log("listening on port 3000"));

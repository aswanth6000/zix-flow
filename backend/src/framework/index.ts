import express, { Express, Request, Response } from "express";
import { dbConnection } from "./database/db.conn";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env);


const app: Express = express();
const port = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL!



app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
dbConnection(DB_URL)
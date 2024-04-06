import express, { Express, Request, Response } from "express";
import { dbConnection } from "./database/db.conn";
import { userRouter} from "../adapters/routes/user.routes";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const DB_URL = process.env.DB_URL!

app.use(cors());
app.use(express.json())
app.use(userRouter)
app.use(express.urlencoded({extended: true}))

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
dbConnection(DB_URL)
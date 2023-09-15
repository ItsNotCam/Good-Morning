import express, { application, json } from 'express';
import dotenv from 'dotenv';
import path from 'path';

import { TestDatabase } from './routes/home';
import MySQLDB from './db/DB';

// env stuff
const ENV_PATH = path.resolve(__dirname, "../config/.env");
dotenv.config({ path: ENV_PATH });

const NODE_PORT: number = Number.parseInt(process.env.NODE_PORT);
const DB_IP: string = process.env.DB_IP;
const DB_USER: string = process.env.DB_USER;
const DB_PASS: string = process.env.DB_PASS;
const DB_NAME: string = process.env.DB_NAME;

// database stuff
const DB = new MySQLDB(DB_IP, DB_USER, DB_PASS, DB_NAME);
DB.connect().then((res) => console.log(res)).catch((res) => console.log(res));
    
// initialize app
var app = express();
app.use(json());


// set routes
app.get("/test_database", (req, res) => TestDatabase(req, res, DB));
    
    
// start server
app.listen(NODE_PORT, () => {
    console.log(`Port: ${NODE_PORT} - DB IP: ${DB_IP} - DB USER: ${DB_USER} - DB PASS: ${DB_PASS}`);
    console.log(`Server is listening on port ${NODE_PORT}`);
})
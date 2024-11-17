import express from "express";
import http from "http";
import https from "https";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
import { mongoConnect } from "./utils/connection.js";
import { errorMiddleware } from "./utils/errorHandling.js";
import path from "path"; 
import fs from "fs";

config({ path: "../.env" });
const PORT = process.env.PORT || 3000; 
const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());
app.use(express.static(path.join(__dirname, "./public")));
app.use(cookieParser());

const startServer = async () => {
    try {
        await mongoConnect();

        let server: https.Server<typeof http.IncomingMessage, typeof http.ServerResponse> | http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
        if (process.env.mode === "production") {
            const options = {
                key: fs.readFileSync("./private.key"), 
                cert: fs.readFileSync("./certificate.crt"),
            };
            server = https.createServer(options, app);
        } else {
            server = http.createServer(app);
        }

        app.use(errorMiddleware);

        server.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (err) {
        console.error("Error starting server:", err);
    }
};

startServer(); 
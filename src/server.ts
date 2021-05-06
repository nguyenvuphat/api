const express = require("express");
import { config } from 'dotenv';
import Configuration from "./config/Configuration";
import {DataContext} from "./core/repositories/DataContext";
import Log from "./core/logs/Log";

function setupEnvironment() {
    const envFound = config();

    if (envFound.error) {
        throw new Error("Couldn't find .env file");
    }
}

function startServer() {
    Log.info("Start API Server in environment " + process.env.NODE_ENV);
    DataContext.init();
    let app = express();

    Configuration.setup(app);

    let port = process.env.NODE_PORT || 3000;

    app.listen(port, () =>{
        Log.info(`Server listening on port: ${port}`);
    });
}

try {
    setupEnvironment();
    startServer();
} catch (e) {
    Log.error("Can't start API Server ", e)
}























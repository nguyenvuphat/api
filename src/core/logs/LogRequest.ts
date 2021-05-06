import Log from "./Log";

let colors = require("colors");
import {LOG_CLASS_LEVEL} from "../common/Enum";

export class LogRequest {
    static logConsole = (req, res, next) => {
        Log.info("Request received");

        res.on("finish", function () {
            if (req.originalUrl === "/") {
                return;
            }

            if ("OPTIONS" !== req.method) {
                let requestObject: any = {
                    log_level: LOG_CLASS_LEVEL.INFO,
                    method: req.method, // http request method
                    endpoint: req.originalUrl, // endpoint requested
                    version: req.headers["accept-version"], // api version used
                    response_code: res.statusCode, // http response code returned
                    body: req.body, // request body received by the service
                    log_time: new Date().toISOString()
                };

                let dataRequest: string = `API \t | logLevel: ${requestObject.log_level}, endpoint: ${requestObject.endpoint}, method: ${requestObject.method}, body: ${JSON.stringify(requestObject.body)}, statusCode: ${requestObject.response_code}`;
                console.log(colors.green(dataRequest));
            }
        });
        next();
    }
}

let _ = require("lodash");
const callsites = require("callsites");
let winston = require("winston");
import {LOG_CLASS_LEVEL} from "../common/Enum";

const config = {
    levels: {
        error: 0,
        debug: 1,
        warn: 2,
        info: 4
    },
    colors: {
        error: "red",
        debug: "blue",
        warn: "yellow",
        info: "cyan"
    }
};

winston.addColors(config.colors);

let alignColorsAndTime = winston.format.combine(
    winston.format.colorize({
        all: true
    }),
    winston.format.printf(
        (info: any) => {
            if (info.logLevel === LOG_CLASS_LEVEL.INFO) {
                return `API \t | logLevel: ${info.level}, message: ${info.message}, location: ${info.location}, time: ${info.time}, Data: ${info.data}`;
            } else if (info.logLevel === LOG_CLASS_LEVEL.DEBUG) {
                return `API \t | logLevel: ${info.level}, message: ${info.message}, location: ${info.location}, time: ${info.time}, Data: ${info.data}, stackTrace: ${info.stackTrace}`;
            } else if (info.logLevel === LOG_CLASS_LEVEL.WARNING) {
                return `API \t | logLevel: ${info.level}, message: ${info.message}, location: ${info.location}, time: ${info.time}, stackTrace: ${info.stackTrace}`;
            } else if (info.logLevel === LOG_CLASS_LEVEL.ERROR) {
                return `API \t | logLevel: ${info.level}, message: ${info.message}, location: ${info.location}, time: ${info.time}, Message error: ${info.error}, stackTrace: ${info.stackTrace}`;
            }
        }
    )
);

export default class Log {
    public static LOG_LEVELS = [LOG_CLASS_LEVEL.INFO, LOG_CLASS_LEVEL.ERROR, LOG_CLASS_LEVEL.DEBUG, LOG_CLASS_LEVEL.WARNING];
    public static NOLOG = false;
    private static logProvider = winston.createLogger({
        levels: config.levels,
        transports: [
            new (winston.transports.Console)({
                format: alignColorsAndTime
            })
        ]
    });

    static formatInfoMessage(logLevel: string, location: any, message: string, data?: any) {
        let messageData: any = {
            logLevel: logLevel,
            message: message,
            location: location,
            time: new Date().toISOString()
        };

        if (data) {
            messageData.data = JSON.stringify(data, null, 2);
        }

        return messageData;
    }

    static info(message: string, data: any = {}) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.INFO) === -1) {
            return;
        }
        this.logProvider.info(this.formatInfoMessage("info", this.getLocation(callsites()), message, data));
    }

    static debug(message: string, data?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.DEBUG) === -1) {
            return;
        }
        this.logProvider.debug(this.formatInfoMessage("debug", this.getLocation(callsites()), message, data));
    }

    static warning(message: string, data?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.WARNING) === -1) {
            return;
        }
        this.logProvider.warn(this.formatInfoMessage("warn", this.getLocation(callsites()), message, data));
    }

    static formatErrorMessage(logLevel: string, location: any, message: string, errorMessage?: any) {
        let messageData: any = {
            logLevel: logLevel,
            message: message,
            location: location,
            time: new Date().toISOString()
        };

        if (errorMessage) {
            if (_.isPlainObject(errorMessage)) {
                messageData.error = JSON.stringify(errorMessage, null, 2);
                messageData.stackTrace = new Error().stack;
            } else if (errorMessage instanceof Error && errorMessage.message) {
                messageData.error = errorMessage.message;
                messageData.stackTrace = errorMessage.stack;
            } else {
                messageData.error = errorMessage;
                messageData.stackTrace = new Error().stack;
            }
        }

        return messageData;
    }

    static error(message: any, error?: any) {
        if (this.NOLOG || this.LOG_LEVELS.indexOf(LOG_CLASS_LEVEL.ERROR) === -1) {
            return;
        }
        this.logProvider.error(this.formatErrorMessage("error", this.getLocation(callsites()), message, error));
    }

    static getLocation(ltDataTrace: any) {
        let dataTrace = ltDataTrace[1];
        let funcName = dataTrace.getFunctionName();
        if (funcName) {
            if (funcName.indexOf(".") >= 0) {
                return funcName + ":" + dataTrace.getLineNumber() + ":" + dataTrace.getColumnNumber();
            } else {
                return dataTrace.getFileName().split("\\").pop().split(".")[0] + "." + funcName + ":" + dataTrace.getLineNumber() + ":" + dataTrace.getColumnNumber();
            }
        } else {
            return dataTrace.getFileName().split("\\").pop() + ":" + dataTrace.getLineNumber() + ":" + dataTrace.getColumnNumber();
        }
    }
}

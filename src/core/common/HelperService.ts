import express = require("express");
const dateFormat = require("dateformat");
const CryptoJS = require("crypto-js");

export class HelperService {
    public static setIPAddress(req: express.Request) {
        global["IP_Address"] = req.headers['x-forwarded-for'] || req.connection.remoteAddress ||
            req.socket.remoteAddress || req.connection.socket.remoteAddress;
    }

    public static formatDate(date: Date, format: string) {
        if (!date) {
            throw "Missing date param";
        }

        return dateFormat(date, format);
    }

    public static createSHA256Hash(value: string): string {
        return CryptoJS.SHA256(value).toString();
    }

}
import express = require("express");
import {inject, injectable} from "inversify";
import {S3Provider} from "../../core/common/S3Provider";
import {itemResult} from "../../core/common/Decorator";

const Busboy = require("busboy");

import * as Q from "q";
import UploadService from "../services/UploadService";

@injectable()
export default class UploadController {
    constructor(@inject("UploadService") private _uploadService: UploadService) {
    }

    @itemResult()
    uploadFile(req: express.Request, res: express.Response) {
        const busboy = new Busboy({headers: req.headers}),
            defer = Q.defer();

        req.pipe(busboy);

        busboy.on("file", function (fieldName, file, filename, encoding, mimeType) {

            console.log(filename);

            let buffers = [];

            file.on("data", function (chunk) {
                buffers.push(chunk);
            });

            file.on("end", function () {
                return S3Provider.upload(filename, Buffer.concat(buffers))
                    .then((data) => {
                        defer.resolve(data);
                    })
                    .catch((error) => {
                       defer.reject(error);
                    });
            });
        });

        busboy.on("finish", function () {

        });

        return defer.promise;
    }

    @itemResult()
    create(req: express.Request, res: express.Response) {
        return this._uploadService.create(req.body);
    }
}

import * as express from "express";
import {Container} from "inversify";
import UploadController from "../controllers/UploadController";
const router = express.Router();

export class UploadRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _uploadController = this.kernel.get<UploadController>("UploadController");

        router.route("/")
            .post(_uploadController.uploadFile.bind(_uploadController));

        router.route("/create")
            .post(_uploadController.create.bind(_uploadController));

        return router;
    }
}

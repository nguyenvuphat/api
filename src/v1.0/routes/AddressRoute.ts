import * as express from "express";
import {Container} from "inversify";
import AddressController from "../controllers/AddressController";
const router = express.Router();

export class AddressRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _addressController = this.kernel.get<AddressController>("AddressController");

        router.route("/")
            .post(_addressController.create.bind(_addressController));

        router.route("/import")
            .post(_addressController.import.bind(_addressController));
        return router;
    }
}

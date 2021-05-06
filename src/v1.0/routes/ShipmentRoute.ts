import * as express from "express";
import {Container} from "inversify";
import ShipmentController from "../controllers/ShipmentController";
const router = express.Router();

export class ShipmentRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _shipmentController = this.kernel.get<ShipmentController>("ShipmentController");

        router.route("/provinces")
            .get(_shipmentController.retrieveProvince.bind(_shipmentController));

        router.route("/districts")
            .get(_shipmentController.retrieveDistrict.bind(_shipmentController));

        router.route("/wards")
            .get(_shipmentController.retrieveWard.bind(_shipmentController));

        router.route("/calculate/fee")
            .post(_shipmentController.calculateFee.bind(_shipmentController));

        router.route("/create-order")
            .post(_shipmentController.createOrder.bind(_shipmentController));

        router.route("/print-order/:_id")
            .get(_shipmentController.printOrder.bind(_shipmentController));

        return router;
    }
}

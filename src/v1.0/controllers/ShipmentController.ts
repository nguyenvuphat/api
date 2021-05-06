import express = require("express");
import {inject, injectable} from "inversify";
import ShipmentService from "../services/ShipmentService";
import {itemResult} from "../../core/common/Decorator";

@injectable()
export default class ShipmentController {
    constructor(@inject("ShipmentService") private _shipmentService: ShipmentService) {
    }

    @itemResult()
    retrieveProvince(req: express.Request, res: express.Response) {
        return this._shipmentService.retrieveProvince();
    }

    @itemResult()
    retrieveDistrict(req: express.Request, res: express.Response) {
        let provinceId = req.query.province;

        if (!provinceId) {
            throw "PROVINCE ID IS REQUIRE";
        }

        provinceId = Number(provinceId);

        return this._shipmentService.retrieveDistrict(provinceId);
    }

    @itemResult()
    retrieveWard(req: express.Request, res: express.Response) {
        let districtId = req.query.district;

        if (!districtId) {
            throw "DISTRICT ID IS REQUIRE";
        }

        districtId = Number(districtId);

        return this._shipmentService.retrieveWard(districtId);
    }

    @itemResult()
    calculateFee(req: express.Request, res: express.Response) {
        let fromDistrict = req.body.fromDistrict;
        let toDistrict = req.body.toDistrict;
        let toWard = req.body.toWard;
        let weight = req.body.weight;

        return this._shipmentService.calculateFee(fromDistrict, toDistrict, toWard, weight);
    }


    @itemResult()
    createOrder(req: express.Request, res: express.Response) {
        let orderId = req.body.orderId;

        return this._shipmentService.createOrder(orderId);
    }

    @itemResult()
    printOrder(req: express.Request, res: express.Response) {
        let orderId = req.params._id;

        return this._shipmentService.printOrder(orderId);
    }
}

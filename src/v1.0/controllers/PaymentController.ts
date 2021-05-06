import express = require("express");
import {inject, injectable} from "inversify";
import PaymentService from "../services/PaymentService";
import {HelperService} from "../../core/common/HelperService";
import {itemResult} from "../../core/common/Decorator";

@injectable()
export default class PaymentController {
    constructor(@inject("PaymentService") private _paymentService: PaymentService) {
    }

    @itemResult()
    create(req: express.Request, res: express.Response) {
        HelperService.setIPAddress(req);

        return this._paymentService.create(req.body.order);
    }

    @itemResult()
    get(req: express.Request, res: express.Response) {
        return this._paymentService.get(req.query);
    }
}
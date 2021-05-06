import * as express from "express";
import * as passport from "passport";
import {Container} from "inversify";

import PaymentController from "../controllers/PaymentController";
const router = express.Router();

export class PaymentRoute {
    constructor(private kernel: Container) {
    }

    get routes() {
        const _paymentController = this.kernel.get<PaymentController>("PaymentController");

        router.route("/")
            .post(_paymentController.create.bind(_paymentController))
            .get(_paymentController.get.bind(_paymentController))

        return router;
    }
}
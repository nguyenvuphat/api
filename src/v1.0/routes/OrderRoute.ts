import * as express from "express";
import * as passport from "passport";
import {Container} from "inversify";
import OrderController from "../controllers/OrderController";
const router = express.Router();

export class OrderRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _orderController = this.kernel.get<OrderController>("OrderController");

        router.route("/")
            .post(_orderController.create.bind(_orderController))
            .get(_orderController.retrieve.bind(_orderController));

        router.route("/:id")
            .put(_orderController.updateById.bind(_orderController))
            .get(_orderController.findById.bind(_orderController));

        return router;
    }
}

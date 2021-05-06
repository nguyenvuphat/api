import * as express from "express";
import * as passport from "passport";
import {Container} from "inversify";
import ProductController from "../controllers/ProductController";

const router = express.Router();

export class ProductRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _productController = this.kernel.get<ProductController>("ProductController");

        router.route("/")
            .post(_productController.create.bind(_productController))
            .get(passport.authenticate("basic", {session: false}), _productController.retrieve.bind(_productController));

        router.route("/:id")
            .get(_productController.findById.bind(_productController));

        return router;
    }
}

import * as express from "express";
import {Container} from "inversify";
import CategoryController from "../controllers/CategoryController";
const router = express.Router();

export class CategoryRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _categoryController = this.kernel.get<CategoryController>("CategoryController");

        router.route("/")
            .post(_categoryController.create.bind(_categoryController))
            .get(_categoryController.retrieve.bind(_categoryController));

        router.route("/:id")
            .put(_categoryController.updateById.bind(_categoryController))
            .get(_categoryController.findById.bind(_categoryController))
            .delete(_categoryController.deleteById.bind(_categoryController));

        return router;
    }
}
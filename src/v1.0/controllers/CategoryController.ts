import express = require("express");
import {inject, injectable} from "inversify";
import CategoryService from "../services/CategoryService";
import {itemResult, listResult} from "../../core/common/Decorator";

@injectable()
export default class CategoryController {
    constructor(@inject("CategoryService") private _categoryService: CategoryService) {

    }

    @itemResult()
    create(req: express.Request, res: express.Response) {
        return this._categoryService.create(req.body);
    }

    @listResult()
    retrieve(req: express.Request, res: express.Response) {
        const page = req.query.page ? Number(req.query.page) : 1,
            pageSize = req.query.pagesize ? Number(req.query.pagesize) : 10;

        return this._categoryService.retrieve(page, pageSize)
    }

    @itemResult()
    updateById(req: express.Request, res: express.Response) {
        return this._categoryService.updateById(req.params.id, req.body);
    }

    @itemResult()
    findById(req: express.Request, res: express.Response) {
        return this._categoryService.findById(req.params.id);
    }

    @itemResult()
    deleteById(req: express.Request, res: express.Response) {
        return this._categoryService.deleteById(req.params.id);
    }
}

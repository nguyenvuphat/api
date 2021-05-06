import express = require("express");
import {inject, injectable} from "inversify";
import {itemResult, listResult} from "../../core/common/Decorator";
import OrderService from "../services/OrderService";

@injectable()
export default class OrderController {
    constructor(@inject("OrderService") private _orderService: OrderService) {
    }

    @itemResult()
    create(req: express.Request, res: express.Response) {
        return this._orderService.create(req.body)
    }

    @itemResult()
    updateById(req: express.Request, res: express.Response) {
        return this._orderService.updateById(req.params.id, req.body);
    }

    @listResult()
    retrieve(req: express.Request, res: express.Response) {
        const page = req.query.page ? Number(req.query.page) : 1,
            pageSize = req.query.pagesize ? Number(req.query.pagesize) : 10;

        return this._orderService.retrieve(page, pageSize);
    }

    @itemResult()
    findById(req: express.Request, res: express.Response) {
        return this._orderService.findById(req.params.id);
    }
}

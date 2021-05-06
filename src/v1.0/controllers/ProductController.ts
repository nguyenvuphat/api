import {inject, injectable} from "inversify";
import ProductService from "../services/ProductService";
import * as express from "express"
import {RESOURCES_PERMISSIONS} from "../../core/common/Resource";
import {authorize, itemResult, listResult, validateDto} from "../../core/common/Decorator";
import {ProductDto} from "../../dtos/products/ProductDto";

@injectable()
export default class ProductController {
    constructor(@inject("ProductService") private _productService: ProductService) {
    }

    @validateDto(new ProductDto())
    @authorize(RESOURCES_PERMISSIONS.PRODUCT.NAME, RESOURCES_PERMISSIONS.PRODUCT.PERMISSIONS.PRODUCT_CREATE)
    @itemResult()
    create(req: express.Request, res: express.Response) {
        return this._productService.create(req.body);
    }

    @authorize(RESOURCES_PERMISSIONS.PRODUCT.NAME, RESOURCES_PERMISSIONS.PRODUCT.PERMISSIONS.PRODUCT_VIEW)
    @listResult()
    retrieve(req: express.Request, res: express.Response) {
        const page = req.query.page ? Number(req.query.page) : 1,
            pageSize = req.query.pagesize ? Number(req.query.pagesize) : 10;

        return this._productService.retrieve(page, pageSize);
    }

    @itemResult()
    findById(req: express.Request, res: express.Response) {
        return this._productService.findById(req.params.id);
    }
}

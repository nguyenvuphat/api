import express = require("express");
import {inject, injectable} from "inversify";
import {itemResult} from "../../core/common/Decorator";
import AddressService from "../services/AddressService";

@injectable()
export default class AddressController {
    constructor(@inject("AddressService") private _addressService: AddressService) {
    }

    @itemResult()
    create(req: express.Request, res: express.Response) {
        return this._addressService.create(req.body)
    }

    @itemResult()
    import(req: express.Request, res: express.Response) {
        return this._addressService.import(req.body)
    }
}

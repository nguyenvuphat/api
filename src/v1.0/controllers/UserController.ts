import express = require("express");
import {inject, injectable} from "inversify";
import UserService from "../services/UserService";

@injectable()
export default class UserController {
    constructor(@inject("UserService") private _userService: UserService) {
    }

    login(req: express.Request, res: express.Response) {
        res.json(req.user);
    }
}

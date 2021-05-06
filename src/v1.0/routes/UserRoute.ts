import * as express from "express";
import * as passport from "passport";
import {Container} from "inversify";
import UserController from "../controllers/UserController";
const router = express.Router();

export class UserRoute {
    constructor(private kernel: Container) {

    }

    get routes() {
        const _userController = this.kernel.get<UserController>("UserController");

        router.route("/login")
            .post(passport.authenticate("local", { session: false }), _userController.login.bind(_userController));

        return router;
    }
}
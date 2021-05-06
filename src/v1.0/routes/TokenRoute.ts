import * as express from "express";
import {Container} from "inversify";
const router = express.Router();

export class TokenRoute {
    constructor(private kernel: Container) {

    }

}
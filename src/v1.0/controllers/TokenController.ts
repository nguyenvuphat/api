import express = require("express");
import {inject, injectable} from "inversify";
import UserService from "../services/UserService";
import TokenService from "../services/TokenService";

export default class TokenController {
    constructor(@inject("UserService") private _tokenService: TokenService) {
    }
}
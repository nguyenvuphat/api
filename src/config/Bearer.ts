import UserService from "../v1.0/services/UserService";
import {Container} from "inversify";
import TokenService from "../v1.0/services/TokenService";
import * as _ from "lodash";
import Authorization from "../core/authorization/Authorization"
import { v4 as uuidv4 } from "uuid";
import RoleService from "../v1.0/services/RoleService";
import kernel from "../v1.0/routes/IocConfig";
const moment = require("moment");

const passport = require("passport"),
    BearStrategy = require("passport-http-bearer");

export default class BearerStrategies {
    static bearerRegister() {
        let bearStrategy = BearStrategy.Strategy,
            iocContainer: Container = kernel,
            userService = iocContainer.get<UserService>("UserService"),
            tokenService = iocContainer.get<TokenService>("TokenService"),
            roleService = iocContainer.get<RoleService>("RoleService");

        let user: any;

        let checkSignatureLogin = (req, email, password, reqSignature) => {
            const signature = Authorization.GenerateSignature(req, email, password);

            if (signature !== reqSignature) {
                console.log("Check Signature Login - Signature Invalid");
                console.log("FE", reqSignature);
                console.log("BE", signature);
                throw "ERROR: SIGNATURE INVALID";
            }
        };
        let checkRequestTimestamp = (req) => {
            const reqTimestamp = req.get("Timestamp"),
                currentTimestamp = Math.floor(Date.now() / 1000);

            if (currentTimestamp - reqTimestamp > _.toNumber(process.env.REQUEST_TIMEOUT)) {
                console.log("Check Request Timestamp - Timestamp Invalid");
                throw "ERROR: REQUEST INVALID";
            }
        };

        let checkTokenExpiry = (tokenExpiryDate) => {
            if (tokenExpiryDate.getTime() < new Date().getTime()) {
                throw "ERROR: TOKEN_EXPIRED";
            }
        };

        let localStrategyHandler = (req, email, done) => {
            let reqSignature = req.get("Signature");

            return userService.findOne({
                "email": email
            })
                .then((_user) => {
                    user = _user;

                    if (user) {
                        const roleId = user.role.toString();

                        return roleService.findById(roleId)
                    }

                    throw "ERROR: USER NOT FOUND";
                })
                .then((role) => {
                    checkSignatureLogin(req, email, user.password, reqSignature);
                    checkRequestTimestamp(req);

                    const expiryDate = moment().add(Number(process.env.EXTEND_TIME_TOKEN), "days").toDate();

                    const token = {
                        expiry: expiryDate,
                        secret: uuidv4(),
                        user: user._id,
                        token: uuidv4(),
                        access: role.resources
                    };

                    return tokenService.create(token);
                })
                .then((token) => {
                    console.log("User login successfully");

                    delete user.password;

                    token = token.toObject();
                    token.user = user;

                    return done(null, token, {scope: 'all'});

                })
                .catch((err) => {
                    return done(err);
                });
        };

        let basicStrategyHandler = (req, reqToken, done) => {
            let reqSignature = req.get("Signature");

            return tokenService.findOne({
                "token": reqToken
            })
                .then((token) => {
                    if (token) {
                        checkSignatureLogin(req, token.token, token.secret, reqSignature);
                        checkRequestTimestamp(req);
                        checkTokenExpiry(token.expiry);

                        return done(null, token, {scope: 'all'});
                    }

                    throw "ERROR: TOKEN NOT FOUND";
                })
                .catch((err) => {
                    return done(err);
                });
        };

        passport.use("local", new bearStrategy({"passReqToCallback": true}, localStrategyHandler));

        passport.use("basic", new bearStrategy({"passReqToCallback": true}, basicStrategyHandler));
    }
}
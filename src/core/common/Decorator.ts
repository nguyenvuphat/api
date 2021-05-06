import UserService from "../../v1.0/services/UserService";
import {BaseDto} from "../../dtos/BaseDto";

export function authorize(resource: string, permission: string) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;

        descriptor.value = function (...params) {
            let req = params[0];

            if (!req.user) {
                throw "User unauthorized";
            }

            let iocContainer = global["IocContainer"];

            if (!iocContainer) {
                console.log("Ioc container hasn't initialized");
                throw "Ioc container hasn't initialized";
            }

            let userService = iocContainer.get<UserService>("UserService");

            const isPermission = userService.checkPermission(req.user, resource, permission);

            if (!isPermission) {
                throw "User unauthorized";
            }

            return method.apply(this, params);
        }
    };
}

export function listResult() {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;

        descriptor.value = function (...params) {
            let res = params[1];

            return method.apply(this, params)
                .spread((count, result) => {
                    res.json({
                        total: count,
                        data: result
                    })
                });
        }
    };
}

export function itemResult() {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;

        descriptor.value = function (...params) {
            let res = params[1];

            return method.apply(this, params)
                .then((data) => {
                    res.json({
                        data: data
                    })
                })
                .catch((err) => {
                        res.json({
                            error: err
                        });
                    }
                )
        }
    };
}

export function validateDto(dto: BaseDto) {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;

        descriptor.value = function (params) {
            dto.simpleSchema.validate(params);

            return method.apply(this, [params]);
        }
    }
}

import {inject, injectable} from "inversify";
import * as _ from "lodash";
import UserRepository from "../repositories/UserRepository";

@injectable()
export default class UserService {
    constructor(@inject("UserRepository") private _userRepository: UserRepository) {
    }

    findOne(condition: any, selectedFields?: string[], lean: boolean = true): any {
        return this._userRepository.findOne(condition, selectedFields, lean);
    }

    checkPermission(token: any, resource: string, permission: string): any {
        // for (let i = 0; i < token.access.length; i++) {
        //     if (token.access[i].name === resource) {
        //         for (let j = 0; j < token.access[i].permissions.length; j++) {
        //             if (token.access[i].permissions[j] === permission) {
        //                 return true;
        //             }
        //         }
        //     }
        // }

        //return false;

        const accessToken = token.access;

        const permissionToken = _.find(accessToken, (access) => {
           return access.name === resource;
        });

        if (!permissionToken) {
            return false;
        }

        return _.includes(permissionToken.permissions, permission);
    }
}
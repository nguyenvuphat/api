import {inject, injectable} from "inversify";
import RoleRepository from "../repositories/RoleRepository";

@injectable()
export default class RoleService {
    constructor(@inject("RoleRepository") private _roleRepository: RoleRepository) {
    }

    findById(roleId: string): any {
        return this._roleRepository.findById(roleId);
    }
}
import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import RoleSchema from "../../schemas/RoleSchema";

@injectable()
export default class RoleRepository extends BaseRepository {
    constructor(){
        super(RoleSchema);
    }
}
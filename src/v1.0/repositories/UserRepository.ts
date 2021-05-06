import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import UserSchema from "../../schemas/UserSchema";

@injectable()
export default class UserRepository extends BaseRepository {
    constructor(){
        super(UserSchema);
    }
}
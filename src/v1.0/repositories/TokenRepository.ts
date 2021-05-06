import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import TokenSchema from "../../schemas/TokenSchema";

@injectable()
export default class TokenRepository extends BaseRepository {
    constructor(){
        super(TokenSchema);
    }
}
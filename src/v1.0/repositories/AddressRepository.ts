import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import AddressSchema from "../../schemas/AddressSchema";

@injectable()
export default class AddressRepository extends BaseRepository {
    constructor(){
        super(AddressSchema);
    }
}
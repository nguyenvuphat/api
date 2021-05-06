import BaseRepository from "../../schemas/BaseRepository";
import CategorySchema from "../../schemas/CategorySchema";
import {injectable} from "inversify";

@injectable()
export default class CategoryRepository extends BaseRepository {
    constructor(){
        super(CategorySchema);
    }
}
import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import ProductSchema from "../../schemas/ProductSchema";

@injectable()
export default class ProductRepository extends BaseRepository {
    constructor(){
        super(ProductSchema);
    }
}
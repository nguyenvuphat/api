import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import OrderSchema from "../../schemas/OrderSchema";

@injectable()
export default class OrderRepository extends BaseRepository {
    constructor(){
        super(OrderSchema);
    }
}
import {inject, injectable} from "inversify";
import OrderRepository from "../repositories/OrderRepository";

@injectable()
export default class OrderService {
    constructor(@inject("OrderRepository") private _orderRepository: OrderRepository) {
    }

    create(item: any, selectedFields?: string[]): any {
        return this._orderRepository.create(item, selectedFields);
    }

    findById(orderId: string) {
        return this._orderRepository.findById(orderId);
    }

    updateById(orderId: string, data: any) {
        return this._orderRepository.updateById(orderId, data);
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any): any{
        return this._orderRepository.retrieve(page, pageSize, selectedFields, sortBy);
    }
}
import {inject, injectable} from "inversify";
import ProductRepository from "../repositories/ProductRepository";

@injectable()
export default class ProductService {
    constructor(@inject("ProductRepository") private _productRepository: ProductRepository) {
    }

    create(item: any, selectedFields?: string[]): any {
        return this._productRepository.create(item, selectedFields);
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any): any {
        return this._productRepository.retrieve(page, pageSize, selectedFields, sortBy);
    }

    findById(id: string): any {
        return this._productRepository.findById(id);
    }
}
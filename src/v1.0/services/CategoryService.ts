import CategoryRepository from "../repositories/CategoryRepository";
import {inject, injectable} from "inversify";

@injectable()
export default class CategoryService {
    constructor(@inject("CategoryRepository") private _categoryRepository: CategoryRepository) {
    }

    create(item: any, selectedFields?: string[]): any {
        return this._categoryRepository.create(item, selectedFields);
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any): any {
        return this._categoryRepository.retrieve(page, pageSize, selectedFields, sortBy);
    }

    updateById(id: string, data: Object, selectedFields?: string[], options?: Object): any {
        return this._categoryRepository.updateById(id, data, selectedFields, options);
    }

    findById(id: string): any {
        return this._categoryRepository.findById(id);
    }

    deleteById(id: string): any {
        return this._categoryRepository.deleteById(id);
    }
}
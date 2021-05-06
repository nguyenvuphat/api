import "reflect-metadata";
import * as Mongoose from "mongoose";
import {injectable, unmanaged} from "inversify";
const Q = require("q");
const _ = require("lodash");

@injectable()
export default class BaseRepository {
    private _model: Mongoose.Model<Mongoose.Document>;

    constructor (@unmanaged() schemaModel: Mongoose.Model<Mongoose.Document>){
        this._model = schemaModel;
    }

    create(item: any, selectedFields?: string[]): any {
        return Q(this._model.create(item))
            .then((result) => {
                if (selectedFields) {
                    return _.pick(result, selectedFields);
                }
                return result;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    retrieve(page?: number, pageSize: number = 10, filter?: any, selectedFields?: string[], sortBy?: any): any {
        let query = this._model.find(filter);

        if (sortBy) {
            query = query.sort(sortBy);
        }

        if (page) {
            query = query.skip((page - 1) * pageSize);
            query = query.limit(pageSize);
        }

        if (selectedFields) {
            query = query.select(selectedFields.join(' '));
        }

        return Q.all([this._model.count(filter).exec(), query.lean(true).exec()]);
    }

    update(condition: Object, data: Object, options: Object): any {
        let query = this._model.update(condition, data, options);

        return query.exec()
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw "Key was not found"
                }
        });
    }

    updateById(id: string, data: Object, selectedFields?: string[], options?: Object): any {
        let query  = this._model.findByIdAndUpdate(id, data, options);

        return query.exec()
            .then ((result) => {
                if (result) {
                    return result;
                } else {
                    throw "Key was not found";
                }
            });
    }

    findById (id: string, options?: {
        selectedFields: string[]}): any {
        
        let query = this._model.findById(id);
        
        if (options && options.selectedFields && options.selectedFields.length) {
            query = query.select(options.selectedFields.join((" ")));
        }

        return query.lean(true).exec()
            .then ((result) => {
               if (result) {
                   return result;
               } else {
                   throw "Key was not found";
               }
            });
    }

    delete(condition: Object) {
        let query = this._model.remove(condition);

        return query.exec()
            .then((result) => {
                if (result["result"]["n"] === 0) {
                    throw "Error";
                } else {
                    return result["result"];
                }
            });
    }

    deleteById(id: string): any {
        return this._model.findByIdAndDelete(id)
            .then ((result) => {
               if (result) {
                   return result;
               }

               throw "Key was not found";
            });
    }

    findOne(condition: Object, selectedFields?: string[], lean?: boolean): any {
        let query = this._model.findOne(condition);

        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join((" ")));
        }

        return query.lean(lean).exec()
            .then((result) => {
                if (result) {
                    return result;
                } else {
                    throw "Key was not found";
                }
            });
    }
}
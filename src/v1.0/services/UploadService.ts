import {inject, injectable} from "inversify";
import UploadRepository from "../repositories/UploadRepository";

@injectable()
export default class UploadService {
    constructor(@inject("UploadRepository") private _uploadRepository: UploadRepository) {
    }

    create(item: any, selectedFields?: string[]): any {
        return this._uploadRepository.create(item, selectedFields);
    }
}

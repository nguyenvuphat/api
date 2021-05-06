import {inject, injectable} from "inversify";
import AddressRepository from "../repositories/AddressRepository";
import {SQSProvider} from "../../core/common/SQSProvider";

@injectable()
export default class AddressService {
    constructor(@inject("AddressRepository") private _addressRepository: AddressRepository) {
    }

    create(item: any, selectedFields?: string[]): any {
        return this._addressRepository.create(item, selectedFields);
    }

    import(upload): any {
        return SQSProvider.sendMessage(upload);
    }
}

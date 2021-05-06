import BaseRepository from "../../schemas/BaseRepository";
import {injectable} from "inversify";
import UploadSchema from "../../schemas/UploadSchema";

@injectable()
export default class UploadRepository extends BaseRepository {
    constructor(){
        super(UploadSchema);
    }
}

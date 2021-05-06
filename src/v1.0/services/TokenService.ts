import {inject, injectable} from "inversify";
import TokenRepository from "../repositories/TokenRepository";

@injectable()
export default class TokenService {
    constructor(@inject("TokenRepository") private _tokenRepository: TokenRepository) {
    }

    create(token: any): any {
        return this._tokenRepository.create(token);
    }

    findOne(condition: any, selectedFields?: string[], lean: boolean = true): any {
        return this._tokenRepository.findOne(condition, selectedFields, lean);
    }
}
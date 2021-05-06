const urlencode = require("urlencode");
const Base64 = require("crypto-js/enc-base64");
const sha256 = require("crypto-js/sha256");

export default class Authorization {
    static GenerateSignature(req, token, secret) {
        // implement generate signature algorithm

        return 'signature';
    }
}

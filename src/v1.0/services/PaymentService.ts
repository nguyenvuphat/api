import {inject, injectable} from "inversify";
import RequestService from "./RequestService";
import * as Q from "q";
import OrderService from "./OrderService";
import {HelperService} from "../../core/common/HelperService";
import * as queryString from "query-string";

@injectable()
export default class PaymentService {
    constructor(@inject("RequestService") private _requestService: RequestService,
                @inject("OrderService") private _orderService: OrderService) {
    }

    create(orderId: string): any {
        return this._orderService.findById(orderId)
            .then((order) => {
                const payload = this.getPayload(order);

                return this.sendPaymentRequest(payload);
            })
    }

    get(payload) {
        const secureHash = payload.vnp_SecureHash;

        const defer = Q.defer();

        delete payload.vnp_SecureHash;
        delete payload.vnp_SecureHashType;

        const secretKey  = process.env.VNPAY_SECRET;
        const signData = secretKey + queryString.stringify(payload, { encode: false });
        const checksum = HelperService.createSHA256Hash(signData);
        
        if (checksum === secureHash) {
            defer.resolve({
                isSuccess: true,
                transaction: this.formatResponse(payload)
            });
        } else {
            defer.reject({
                isSuccess: false,
                transaction: null
            });
        }

        return defer.promise;
    }

    private formatResponse(objectResponse: any) {
        return {
            merchant: objectResponse.vnp_TmnCode,
            order: objectResponse.vnp_TxnRef,
            amount: objectResponse.vnp_Amount / 100,
            orderInfo: objectResponse.vnp_OrderInfo,
            responseCode: objectResponse.vnp_ResponseCode,
            bankCode: objectResponse.vnp_BankCode,
            bankTranNo: objectResponse.vnp_BankTranNo,
            cardType: objectResponse.vnp_CardType,
            payDate: objectResponse.vnp_PayDate,
            gatewayTransactionNo: objectResponse.vnp_TransactionNo,
            secureHash: objectResponse.vnp_SecureHash
        };
    }

    private getPayload(order: any) {
        return {
            vnp_Version: "2",
            vnp_Command: "pay",
            vnp_TmnCode: process.env.VNPAY_MERCHANT,
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: order._id,
            vnp_OrderInfo: "example",
            vnp_OrderType: "250000",
            vnp_Amount: Number(order.total) * 100,
            vnp_ReturnUrl: process.env.VNPAY_RETURN_URL,
            vnp_IpAddr: global["IP_Address"],
            vnp_CreateDate: HelperService.formatDate(order.createdAt, "yyyymmddHHmmss"),
            vnp_BankCode: order.payment.method === "ATM" ? undefined : "VISA"
        }
    }

    sendPaymentRequest(payload: any) {
        const signData = process.env.VNPAY_SECRET + queryString.stringify(payload, { encode: false });

        payload.vnp_SecureHashType = "SHA256";
        payload.vnp_SecureHash = HelperService.createSHA256Hash(signData);

        return process.env.VNPAY_GATEWAY_URL + "?" + queryString.stringify(payload, { encode: true });
    }
}

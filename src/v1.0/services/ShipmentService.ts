import {inject, injectable} from "inversify";
import RequestService from "./RequestService";
import {HTTP_VERBS} from "../../core/common/Enum";
import OrderService from "./OrderService";

@injectable()
export default class ShipmentService {
    constructor(@inject("RequestService") private _requestService: RequestService,
                @inject("OrderService") private _orderService: OrderService) {
    }

    retrieveProvince() {
        return this._requestService.sendRequest({
            method: HTTP_VERBS.GET,
            url: process.env.GET_PROVINCE_GHN,
            headers: {
                Token: process.env.TOKEN_GHN
            }
        });
    }

    retrieveDistrict(provinceId: number) {
        return this._requestService.sendRequest({
            method: HTTP_VERBS.POST,
            url: process.env.GET_DISTRICT_GHN,
            headers: {
                Token: process.env.TOKEN_GHN
            },
            data: {
                province_id: provinceId
            }
        });
    }

    retrieveWard(districtId: number) {
        return this._requestService.sendRequest({
            method: HTTP_VERBS.POST,
            url: process.env.GET_WARD_GHN,
            headers: {
                Token: process.env.TOKEN_GHN
            },
            data: {
                district_id: districtId
            }
        });
    }

    calculateFee(fromDistrict, toDistrict, toWard, weight) {
        return this._requestService.sendRequest({
            method: HTTP_VERBS.POST,
            url: process.env.CALCULATE_FEE_GHN,
            headers: {
                Token: process.env.TOKEN_GHN
            },
            data: {
                service_id: 53320,
                from_district_id: fromDistrict,
                to_district_id: toDistrict,
                to_ward_code: toWard,
                weight: weight
            }
        });
    }

    createOrder(orderId) {
        return this._orderService.findById(orderId)
            .then((order: any) => {
                return this._requestService.sendRequest({
                    method: HTTP_VERBS.POST,
                    url: process.env.CREATE_ORDER_GHN,
                    headers: {
                        Token: process.env.TOKEN_GHN
                    },
                    data: {
                        payment_type_id: 2,
                        required_note: "KHONGCHOXEMHANG",
                        return_phone: "0332190458",
                        client_order_code: order._id.toString(),
                        to_name: order.firstName + order.lastName,
                        to_phone: order.address.mobile,
                        to_address: order.address.address + ", " + order.address.ward.name + ", " + order.address.district.name + ", " +order.address.province.name,
                        to_ward_code: order.address.ward.id.toString(),
                        to_district_id: order.address.district.id,
                        cod_amount: order.total,
                        content: "Hàng hóa",
                        weight: order.shipment.weight,
                        length: 0,
                        width: 0,
                        height: 0,
                        pick_station_id: 0,
                        insurance_value: 0,
                        service_id: 0,
                        service_type_id:2,
                        coupon: null
                    }
                });
            })
            .then((orderGHN) => {
                return this._orderService.updateById(orderId, {
                   "shipment.status": "approved",
                   "shipment.ghn_order_code": orderGHN.data.order_code
                });
            });

    }

    printOrder(orderId) {
        return this._orderService.findById(orderId)
            .then((order: any) => {
                return this._requestService.sendRequest({
                    method: HTTP_VERBS.POST,
                    url: process.env.GEN_TOKEN_GHN,
                    headers: {
                        Token: process.env.TOKEN_GHN,
                    },
                    data: {
                        order_codes: [order.shipment.ghn_order_code]
                    }
                });
            })
            .then((orderGHN) => {
                return process.env.PRINT_ORDER_URL_GHN + orderGHN.data.token;
            });

    }
}

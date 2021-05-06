import {DataContext} from "../core/repositories/DataContext";
import {RESOURCES, SCHEMA} from "../core/common/ResourceType";

const mongoose = DataContext.mongooseInstance;

const orderSchema = new mongoose.Schema({
        address: {
            user: SCHEMA.DB_REF.USERS,
            address: String,
            mobile: String,
            receiver: String,
            province: {
                id: Number,
                name: String
            },
            district: {
                id: Number,
                name: String
            },
            ward: {
                id: Number,
                name: String
            }
        },
        firstName: String,
        lastName: String,
        products: [
            {
                id: SCHEMA.DB_REF.PRODUCTS,
                name: String,
                option1: String,
                option2: String,
                price: Number,
                thumbnail: String,
                discount: Number,
                quantity: Number,
                weight: Number
            }
        ],
        createdAt: Date,
        updatedAt: Date,
        subtotal: Number,
        total: Number,
        payment: {
            status: String,
            provider: String,
            method: String,
            transaction: String
        },
        shipment: {
            fee: Number,
            provider: String,
            method: String,
            status: String,
            paymentType: String,
            note: String,
            delivery: Date,
            weight: Number,
            ghn_order_code: String
        },
        voucher: String

    },
    {versionKey: false, timestamps: true});

export default mongoose.model(RESOURCES.ORDERS, orderSchema);

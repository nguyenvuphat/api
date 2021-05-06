import mongoose = require("mongoose");

export const RESOURCES = {
    CATEGORIES: "categories",
    USERS: "users",
    TOKENS: "tokens",
    ADDRESSES: "addresses",
    ROLES: "roles",
    PRODUCTS: "products",
    SHOPS: "shops",
    ORDERS: "orders",
    OFFERS: "orders",
    VOUCHERS: "products",
    UPLOADS: "uploads"
};

export const SCHEMA = {
    DB_REF: {
        CATEGORIES: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.CATEGORIES
        },

        USERS: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.USERS
        },

        ROLES: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.ROLES
        },

        SHOPS: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.SHOPS
        },

        PRODUCTS: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.PRODUCTS
        },

        OFFERS: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.OFFERS
        },

        VOUCHERS: {
            type: mongoose.Schema.Types.ObjectId,
            ref: RESOURCES.VOUCHERS
        }
    }
}

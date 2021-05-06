import {RESOURCES, SCHEMA} from "../core/common/ResourceType";
import {DataContext} from "../core/repositories/DataContext";

const mongoose = DataContext.mongooseInstance;

const vouchersSchema = new mongoose.Schema({
        offer: SCHEMA.DB_REF.OFFERS,
        code: String,
        value: Number,
        unit: String,
        sent: Date,
        redeem: Date,
        createdAt: Date,
        updatedAt: Date,
        user: SCHEMA.DB_REF.USERS
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model(RESOURCES.VOUCHERS, vouchersSchema);
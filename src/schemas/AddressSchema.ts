import {DataContext} from "../core/repositories/DataContext";
import {RESOURCES, SCHEMA} from "../core/common/ResourceType";

const mongoose = DataContext.mongooseInstance;

const addressSchema = new mongoose.Schema({
        name: String,
        user: SCHEMA.DB_REF.USERS,
        receiver: String,
        address: String,
        mobile: String,
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
    {versionKey: false, timestamps: true}
);

export default mongoose.model(RESOURCES.ADDRESSES, addressSchema);
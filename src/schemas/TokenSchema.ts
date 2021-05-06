import {DataContext} from "../core/repositories/DataContext";
import {RESOURCES, SCHEMA} from "../core/common/ResourceType";

const mongoose = DataContext.mongooseInstance;

const tokenSchema = new mongoose.Schema({
        token: String,
        secret: String,
        user: SCHEMA.DB_REF.USERS,
        access: [
            {
                _id: false,
                name: String,
                permissions: [
                    String
                ]
            }
        ],
        expiry: Date,
        createdAt: Date
    },
    { versionKey: false, timestamps: true });

export default mongoose.model(RESOURCES.TOKENS, tokenSchema);
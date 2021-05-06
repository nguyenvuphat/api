import {RESOURCES, SCHEMA} from "../core/common/ResourceType";
import {DataContext} from "../core/repositories/DataContext";

const mongoose = DataContext.mongooseInstance;

const uploadSchema = new mongoose.Schema({
        url: String,
        key: String,
        bucket: String,
        createdAt: Date,
        updatedAt: Date,
        user: SCHEMA.DB_REF.USERS
    },
    {versionKey: false, timestamps: true}
);

export default mongoose.model(RESOURCES.UPLOADS, uploadSchema);

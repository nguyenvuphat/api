import {RESOURCES, SCHEMA} from "../core/common/ResourceType";
import {DataContext} from "../core/repositories/DataContext";

const mongoose = DataContext.mongooseInstance;

const ordersSchema = new mongoose.Schema({
        name: String,
        description: String,
        createdAt: Date,
        updatedAt: Date
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model(RESOURCES.OFFERS, ordersSchema);
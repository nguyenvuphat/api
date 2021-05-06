import {RESOURCES, SCHEMA} from "../core/common/ResourceType";
import {DataContext} from "../core/repositories/DataContext";

const mongoose = DataContext.mongooseInstance;

const categorySchema = new mongoose.Schema({
        name: String,
        parent: SCHEMA.DB_REF.CATEGORIES,
        parentPath: [
            SCHEMA.DB_REF.CATEGORIES
        ]
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model(RESOURCES.CATEGORIES, categorySchema);
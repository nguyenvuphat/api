import {DataContext} from "../core/repositories/DataContext";
import {RESOURCES} from "../core/common/ResourceType";

const mongoose =DataContext.mongooseInstance;

const roleSchema = new mongoose.Schema({
        name: String,
        resources: [
            {
                name: String,
                permissions: [String]
            }
        ]
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model(RESOURCES.ROLES, roleSchema);
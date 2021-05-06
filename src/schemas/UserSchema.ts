import {DataContext} from "../core/repositories/DataContext";
import {RESOURCES, SCHEMA} from "../core/common/ResourceType";

const mongoose =DataContext.mongooseInstance;

const userSchema = new mongoose.Schema({
        name: String,
        email: String,
        mobile: String,
        password: String,
        firstName: String,
        lastName: String,
        status: String,
        role: SCHEMA.DB_REF.ROLES
    },
    { versionKey: false, timestamps: true }
);

export default mongoose.model(RESOURCES.USERS, userSchema);
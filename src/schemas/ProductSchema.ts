import {DataContext} from "../core/repositories/DataContext";
import {RESOURCES, SCHEMA} from "../core/common/ResourceType";

const mongoose = DataContext.mongooseInstance;

const productSchema = new mongoose.Schema({
        name: String,
        shop: SCHEMA.DB_REF.SHOPS,
        descriptions: [],
        thumbnail: String,
        image_360: String,
        rating: Number,
        category: SCHEMA.DB_REF.CATEGORIES,
        config_options: [
            {
                _id: false,
                code: String,
                name: String,
                values: [
                    {
                        _id: false,
                        label: String,
                    }
                ]
            }
        ],
        config_products: [
            {
                _id: false,
                option1: String,
                option2: String,
                weight: Number,
                price: Number,
                thumbnail: String,
                discount: String,
                name: String,
                quantity: String
            }
        ]
    },
    { versionKey: false, timestamps: true });

export default mongoose.model(RESOURCES.PRODUCTS, productSchema);

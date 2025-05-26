import {Schema, model, Types} from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";

import 'dotenv/config'

export interface ProductI extends SoftDeleteDocument {
    thumbnail?: string
    name: string | null

    type: string | null
    description: string | null

    plans: {
        name: string,
        description: string | null
        details: {
            key: string,
            value: string
        }[]
        prices: {
            key: string,
            link: string,
            value: number,
            discount: number
            duration: number
        }
    }[]

    tva: number | null
    activations: boolean | null
}

export const ProductSchema = new Schema<ProductI>({
    thumbnail:  { type: String},
    name: { type: String, required: true },
    type: { type: String },
    description: { type: String },

    plans: [{
        name: String,
        description: { type: String },
        details: [{
            key: { type: String },
            value: { type: String }
        }],
        prices: [{
            key: { type: String },
            link: { type: String },
            value: { type: Number },
            discount: { type: Number },
            duration: { type: Number }
        }]
    }],

    tva: { type: Number },
    activations: { type: Boolean, default: true },

}, {
    timestamps: true
});

ProductSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Product = model<ProductI>('Product', ProductSchema);
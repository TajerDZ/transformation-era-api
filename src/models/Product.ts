import {Schema, model, Types} from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";

import 'dotenv/config'

export interface ProductI extends SoftDeleteDocument {
    thumbnail?: string
    name: string | null

    price: number | null
    type: string | null
    description: string | null

    details: string[]
}

export const ProductSchema = new Schema<ProductI>({
    thumbnail:  { type: String},
    name: { type: String, required: true },
    price: { type: Number },
    type: { type: String },

    description: { type: String },

    details: [{ type: String }],

}, {
    timestamps: true
});

ProductSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Product = model<ProductI>('Product', ProductSchema);
import {Schema, model, Types} from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";

import 'dotenv/config'

export interface OrderI extends SoftDeleteDocument {
    section: string | null

    fullName: string | null
    email: string | null
    phone: string | null

    idProduct: Types.ObjectId | null
}

export const OrderSchema = new Schema<OrderI>({
    section: { type: String, required: true },

    fullName: { type: String },
    email: { type: String },
    phone: { type: String },

    idProduct: [{ type: Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true
});

OrderSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Order = model<OrderI>('Order', OrderSchema);
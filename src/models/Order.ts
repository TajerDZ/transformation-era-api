import {Schema, model, Types} from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";

import 'dotenv/config'

export interface OrderI extends SoftDeleteDocument {
    section: string | null

    idUser: any
    idProduct: any
    idPlan: any
    idPrice: any
    price: number
    duration: string
    renewalDate: Date
    status: string

    timeLine: {
        type: string
        createdAt: Date
        status: string

        oldIdProduct: any
        oldIdPlan: any
        oldIdPrice: any
    }[]
}

export const OrderSchema = new Schema<OrderI>({
    section: { type: String, required: true },

    idUser: { type: Types.ObjectId, ref: 'User' },
    idProduct: { type: Types.ObjectId, ref: 'Product' },

    idPlan: { type: Types.ObjectId },
    idPrice: { type: Types.ObjectId },
    price: { type: Number },
    duration: { type: String },
    renewalDate: { type: Date },
    status: { type: String },

    timeLine: [{
        type: { type: String },
        createdAt: { type: Date },
        status: { type: String },

        oldIdProduct: { type: Types.ObjectId, ref: 'Product' },
        oldIdPlan: { type: Types.ObjectId },
        oldIdPrice: { type: Types.ObjectId }
    }]
}, {
    timestamps: true
});

OrderSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Order = model<OrderI>('Order', OrderSchema);
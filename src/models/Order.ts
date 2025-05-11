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
    duration: number
    renewalDate: Date
    status: string
    domainName: string

    updated: boolean

    timeLine: {
        type: string
        createdAt: Date
        status: string
        idProduct: any
        idPlan: any
        idPrice: any
        price: number
        duration: number
        renewalDate: Date
    }[]
}

export const OrderSchema = new Schema<OrderI>({
    section: { type: String, required: true },

    idUser: { type: Types.ObjectId, ref: 'User' },
    idProduct: { type: Types.ObjectId, ref: 'Product' },

    idPlan: { type: Types.ObjectId },
    idPrice: { type: Types.ObjectId },
    price: { type: Number },
    duration: { type: Number },
    renewalDate: { type: Date },
    status: { type: String },
    domainName: { type: String },
    updated: { type: Boolean, default: false },
    timeLine: [{
        type: { type: String },
        createdAt: { type: Date },
        status: { type: String },
        idProduct: { type: Types.ObjectId, ref: 'Product' },
        price: { type: Number },
        duration: { type: Number },
        idPlan: { type: Types.ObjectId },
        idPrice: { type: Types.ObjectId },
        renewalDate: { type: Date }
    }]
}, {
    timestamps: true
});

OrderSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Order = model<OrderI>('Order', OrderSchema);
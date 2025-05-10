import { Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";
import {Types} from "mongoose";

export interface InvoiceI extends SoftDeleteDocument {
    numberInvoice: string
    type: string
    status: string
    price: number
    duration: number
    totalDiscount: number
    totalPrice: number
    subTotalPrice: number
    tva: number
    dueDate: Date
    idOrder: Types.ObjectId
    idProduct: Types.ObjectId
    idUser: Types.ObjectId
}

export const InvoiceSchema = new Schema<InvoiceI>({
    numberInvoice: { type: String },
    type: { type: String },
    status: { type: String },
    price: { type: Number },
    duration: { type: Number },
    totalDiscount: { type: Number },
    totalPrice: { type: Number },
    subTotalPrice: { type: Number },
    tva: { type: Number },
    dueDate: { type: Date },
    idOrder: { type: Schema.Types.ObjectId, ref: 'Order' },
    idProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
    idUser: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

InvoiceSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Invoice = model<InvoiceI>('Invoice', InvoiceSchema);
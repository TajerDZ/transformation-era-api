import { Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";
import {Types} from "mongoose";
import {verifyPaymentsMoyasar} from "../helpers";

export interface InvoiceI extends SoftDeleteDocument {
    numberInvoice: string
    totalPrice: number
    file: string
    date: Date
    linkPayment: string
    status: string

    idOrder: Types.ObjectId
    idUser: Types.ObjectId
}

export const InvoiceSchema = new Schema<InvoiceI>({
    numberInvoice: { type: String },
    totalPrice: { type: Number },
    file: { type: String },
    linkPayment: { type: String },
    status: { type: String, default: 'pending' },
    date: { type: Date },
    idOrder: { type: Schema.Types.ObjectId, ref: 'Order' },
    idUser: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

InvoiceSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Invoice = model<InvoiceI>('Invoice', InvoiceSchema);
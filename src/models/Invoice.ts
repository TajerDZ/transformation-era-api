import { Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";
import {Types} from "mongoose";

export interface InvoiceI extends SoftDeleteDocument {
    numberInvoice: string
    totalPrice: number
    file: string
    date: Date

    idUser: Types.ObjectId
}

export const InvoiceSchema = new Schema<InvoiceI>({
    numberInvoice: { type: String },
    totalPrice: { type: Number },
    file: { type: String },
    date: { type: Date },
    idUser: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

InvoiceSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Invoice = model<InvoiceI>('Invoice', InvoiceSchema);
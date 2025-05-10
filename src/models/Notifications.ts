import { Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";
import {Types} from "mongoose";

export interface NotificationsI extends SoftDeleteDocument {
    idOrder: Types.ObjectId
    type: string
}

export const NotificationsSchema = new Schema<NotificationsI>({
    idOrder: { type: Types.ObjectId, ref: 'Order' },
    type: { type: String }
}, {
    timestamps: true
});

NotificationsSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Notifications = model<NotificationsI>('Notifications', NotificationsSchema);
import { Schema, model } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";
import {Types} from "mongoose";

export interface NotificationsI extends SoftDeleteDocument {
    title: string
    msg: string
    type: string
    idUser: Types.ObjectId
}

export const NotificationsSchema = new Schema<NotificationsI>({
    title: { type: String },
    msg: { type: String },
    type: { type: String },
    idUser: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

NotificationsSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const Notifications = model<NotificationsI>('Notifications', NotificationsSchema);
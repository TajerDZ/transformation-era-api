import { Schema, model, Types } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";


export interface  UserI extends SoftDeleteDocument {
    thumbnail: string | null
    firstname: string | null
    lastname: string | null
    email: string | null

    phone: string | null

    password: string
    role: string | null

    activation: boolean | null
    emailVerify: boolean | null

    codeVerify: string | null
    otpPassword: string | null
}

export const UserSchema = new Schema<UserI>({
    thumbnail: { type: String },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },

    phone: { type: String, required: true },

    password: { type: String, required: true },
    role: { type: String, required: true },

    activation: { type: Boolean, required: true },
    emailVerify: { type: Boolean, required: true },

    codeVerify: { type: String },
    otpPassword: { type: String },
}, {
    timestamps: true
});

UserSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const User = model<UserI>('User', UserSchema);
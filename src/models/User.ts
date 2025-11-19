import { Schema, model, Types } from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";
import {createDomainInOpenProvider} from "../helpers";


export interface  UserI extends SoftDeleteDocument {
    thumbnail: string | null
    firstname: string | null
    lastname: string | null
    email: string | null

    phone: string | null
    address: {
        street: string | null
        number: string | null
        city: string | null
        zipcode: string | null
        state: string | null
        country: string | null
    }

    password: string
    role: string | null

    activation: boolean | null
    emailVerify: boolean | null

    codeVerify: string | null
    otpPassword: string | null
    idCustomerOpenProvider: string | null
}

export const UserSchema = new Schema<UserI>({
    thumbnail: { type: String },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: false },

    phone: { type: String, required: true },
    address: {
        street: { type: String },
        number: { type: String },
        city: { type: String },
        zipcode: { type: String },
        state: { type: String },
        country: { type: String }
    },

    password: { type: String, required: true },
    role: { type: String, required: true },

    activation: { type: Boolean, required: true },
    emailVerify: { type: Boolean, required: true },

    codeVerify: { type: String },
    otpPassword: { type: String },

    idCustomerOpenProvider: { type: String },
}, {
    timestamps: true
});

UserSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const User = model<UserI>('User', UserSchema);
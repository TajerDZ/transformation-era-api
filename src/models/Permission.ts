import {Schema, model, Types} from 'mongoose';
import MongooseDelete from 'mongoose-delete'
import {SoftDeleteDocument} from "mongoose-delete";

import 'dotenv/config'

export interface PermissionGroupI extends SoftDeleteDocument {
    name: string;
    permissions: {
        table: string;
        allowedAll: boolean;

        operations: {
            name: string;
            allowed: boolean;
        }[]
    }[]
}

export const PermissionGroupSchema = new Schema<PermissionGroupI>({
    name: { type: String, required: false },
    permissions: [{
        table: { type: String, required: false },
        allowedAll: { type: Boolean, required: false },

        operations: [{
            name: { type: String, required: false },
            allowed: { type: Boolean, required: false }
        }],
    }]
}, {
    timestamps: true
});

PermissionGroupSchema.plugin(MongooseDelete, { overrideMethods: true, deleted: true, deletedAt: true });

export const PermissionGroup = model<PermissionGroupI>('PermissionGroup', PermissionGroupSchema);
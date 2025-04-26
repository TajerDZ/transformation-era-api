import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {PermissionGroup} from "../../models/index.js";
import {Types} from "mongoose";
dotenv.config();


export const resolvers = {
    Query: {
        permissionGroup: async (parent, {id}, contextValue, info) =>  {
            try {
                const permissionGroup = await PermissionGroup.findById(id);

                return permissionGroup
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        allPermissionGroup: async (parent, {}, contextValue, info) =>  {
            try {
                let query = {deleted: false};

                const permissionGroup = await PermissionGroup.find(query)
                const totalPermissionGroup = await PermissionGroup.countDocuments(query)


                return {
                    data: permissionGroup,
                    total: totalPermissionGroup
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    PermissionGroup: {
    },

    Mutation: {
        createPermissionGroup: async (parent, {content}, contextValue, info) =>  {
            try {
                let permissionGroup = await PermissionGroup.create({
                    ...content
                })

                return permissionGroup
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updatePermissionGroup: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let result = null

                if(Object.keys(content).length > 0) {
                    result = await PermissionGroup.findByIdAndUpdate(id, content, {includeResultMetadata: true, new: true});
                }

                return {
                    data: result?.value,
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deletePermissionGroup: async (parent, {id}, contextValue, info) =>  {
            try {
                // @ts-ignore
                const {modifiedCount} = await PermissionGroup?.deleteById(id)

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        addPermissionToPermissionGroup: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let result = await PermissionGroup.findByIdAndUpdate(id, {
                    $push: {permissions: content}
                }, {includeResultMetadata: true, new: true});

                return {
                    data: result?.value,
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updatePermissionInPermissionGroup: async (parent, {idPermissionGroup, id, content}, contextValue, info) =>  {
            try {
                let updateRepaymentToPermissionGroup = await PermissionGroup.findOneAndUpdate({
                    _id: new Types.ObjectId(idPermissionGroup),
                    "permissions._id": new Types.ObjectId(id)
                }, {
                    $set: {
                        "permissions.$.table": content.table,
                        "permissions.$.allowedAll": content.allowedAll,
                        "permissions.$.operations": content.operations,
                    }
                }, {new: true});

                if (updateRepaymentToPermissionGroup) {
                    return {
                        data: updateRepaymentToPermissionGroup,
                        status: true
                    }
                }
                return {data: null, status: false}
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deletePermissionToPermissionGroup: async (parent, {idPermissionGroup, id}, contextValue, info) =>  {
            try {
                let {ok, value} = await PermissionGroup.findByIdAndUpdate(idPermissionGroup, {
                    $pull: {permissions: {_id: new Types.ObjectId(id)}}
                }, {includeResultMetadata: true, new: true});

                return {
                    data: value,
                    status: ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

    }
}

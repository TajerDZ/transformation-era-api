import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Order, } from "../../models/index.js";
import {Types} from "mongoose";
import {buildFilter} from "../../helpers/index.js";

dotenv.config();


export const resolvers = {
    Query: {
        product: async (parent, {id}, contextValue, info) =>  {
            try {
                const product = await Order.findById(id);

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        allOrder: async (parent, {filter, pagination}, contextValue, info) =>  {
            try {
                let query = {deleted: false};
                if (filter && filter.length > 0) {
                    const newFilter = filter.reduce((acc, { field, operator, value }) => {
                        try {
                            // تحويل القيمة إذا لزم الأمر (مثل $in يتطلب Array)
                            const parsedValue = operator === '$in' ? JSON.parse(value) : value;

                            // دمج الشروط
                            acc[field] = operator === '$in' ? { [operator]: parsedValue, options: "i" } : { [operator]: parsedValue };
                        } catch (error) {
                            return new GraphQLError(`Invalid value for operator ${operator}: ${error.message}`);
                        }
                        return acc;
                    }, {});

                    const mongoFilter = await buildFilter(filter);

                    query = {...query, ...mongoFilter}
                }

                const options: {limit?: number, skip?: number, sort?: any} = {};
                if (pagination) {
                    const {limit, page} = pagination;
                    options.limit = limit;
                    options.skip = (page - 1) * limit;
                    options.sort = {createdAt: -1};
                }

                const products = await Order.find(query, null, options)
                const totalOrders = await Order.countDocuments(query)

                return {
                    data: products,
                    total: totalOrders
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

    },
    
    Order: {
        product: async ({idOrder}, {id}, contextValue, info) =>  {
            try {
                const product = await Order.findById(idOrder);

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        user: async ({idUser}, {id}, contextValue, info) =>  {
            try {
                const user = await Order.findById(idUser);

                return user
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    Mutation: {
        createOrder: async (parent, {content}, contextValue, info) =>  {
            try {
                let product = await Order.create({
                    ...content
                })

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updateOrder: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let result = null

                if(Object.keys(content).length > 0) {
                    result = await Order.findByIdAndUpdate(id, content, {includeResultMetadata: true, new: true});
                }

                return {
                    data: result?.value,
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteOrder: async (parent, {id}, contextValue, info) =>  {
            try {
                // @ts-ignore
                const {modifiedCount} = await Order?.deleteById(id)

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteMultiOrder: async (parent, {id}, contextValue, info) =>  {
            try {
                const productIdsAsObjectId = id.map(id => new Types.ObjectId(id));

                // @ts-ignore
                const {modifiedCount} = await Order?.delete({
                    _id: { $in: productIdsAsObjectId }
                })

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

    }
}
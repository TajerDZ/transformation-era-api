import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Product, } from "../../models/index.js";
import {Types} from "mongoose";
import {buildFilter} from "../../helpers/index.js";

dotenv.config();


export const resolvers = {
    Query: {
        product: async (parent, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findById(id);

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        allProduct: async (parent, {idWorkspace, filter, pagination}, contextValue, info) =>  {
            try {
                let query = {idWorkspace: new Types.ObjectId(idWorkspace), deleted: false};
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

                const products = await Product.find(query, null, options)
                const totalProducts = await Product.countDocuments(query)

                return {
                    data: products,
                    total: totalProducts
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

    },

    Mutation: {
        createProduct: async (parent, {content}, contextValue, info) =>  {
            try {
                let product = await Product.create({
                    ...content
                })

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updateProduct: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let result = null

                if(Object.keys(content).length > 0) {
                    result = await Product.findByIdAndUpdate(id, content, {includeResultMetadata: true, new: true});
                }

                return {
                    data: result?.value,
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteProduct: async (parent, {id}, contextValue, info) =>  {
            try {
                // @ts-ignore
                const {modifiedCount} = await Product?.deleteById(id)

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteMultiProduct: async (parent, {id}, contextValue, info) =>  {
            try {
                const productIdsAsObjectId = id.map(id => new Types.ObjectId(id));

                // @ts-ignore
                const {modifiedCount} = await Product?.delete({
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
import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Invoice, User} from "../../models/index.js";
import {buildFilter} from "../../helpers/index.js";

dotenv.config();


export const resolvers = {
    Query: {
        invoice: async (parent, {id}, contextValue, info) =>  {
            try {
                const invoice = await Invoice.findById(id);

                return invoice
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        allInvoice: async (parent, {filter, pagination}, contextValue, info) =>  {
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
                    options.sort = {updatedAt: -1};
                }

                const invoices = await Invoice.find(query, null, options)
                const totalOrders = await Invoice.countDocuments(query)

                return {
                    data: invoices,
                    total: totalOrders
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        allInvoiceClient: async (parent, {idUser, filter, pagination}, contextValue, info) =>  {
            try {
                let query = {idUser, deleted: false};
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
                    options.sort = {updatedAt: -1};
                }

                const invoices = await Invoice.find(query, null, options)
                const totalOrders = await Invoice.countDocuments(query)

                return {
                    data: invoices,
                    total: totalOrders
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    Invoice: {
        user: async ({idUser}, {id}, contextValue, info) =>  {
            try {
                const user = await User.findById(idUser);

                return user
            } catch (error) {
                throw new GraphQLError(error)
            }
        }
    },

    Mutation: {
        createInvoice: async (parent, {content}, contextValue, info) =>  {
            try {
                let invoice = await Invoice.create({
                    ...content
                })

                return invoice
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updateInvoice: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let result = null

                if(Object.keys(content).length > 0) {
                    result = await Invoice.findByIdAndUpdate(id, content, {includeResultMetadata: true, new: true});
                }

                return {
                    data: result?.value,
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteInvoice: async (parent, {id}, contextValue, info) =>  {
            try {
                // @ts-ignore
                const {modifiedCount} = await Invoice?.deleteById(id)

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

    }
}
import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Invoice, Order, Product, User} from "../../models/index.js";
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

        allOrderClient: async (parent, {idUser, filter, pagination}, contextValue, info) =>  {
            try {
                let query = {idUser: new Types.ObjectId(idUser), deleted: false};
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
                    options.sort = {createdAt: -1};
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
    
    Order: {
        product: async ({idProduct}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findById(idProduct);

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        user: async ({idUser}, {id}, contextValue, info) =>  {
            try {
                const user = await User.findById(idUser);

                return user
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        plan: async ({idProduct, idPlan}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findOne({
                    _id: idProduct,
                    plans: {$elemMatch: {_id: idPlan}}
                }, {"plans.$": 1});

                return product?.plans?.[0] || null
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        pricePlans: async ({idProduct, idPlan, idPrice}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findOne({
                    _id: idProduct,
                    plans: {$elemMatch: {_id: idPlan}}
                }, {"plans.$": 1});
                const plan = product?.plans?.[0]

                //@ts-ignore
                const pricePlans = plan?.prices?.find(price => price?._id?.toString() === idPrice?.toString())

                return pricePlans || null
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    TimeLineOrder: {
        oldProduct: async ({oldIdProduct}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findById(oldIdProduct);

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        oldPlan: async ({oldIdProduct, oldIdPlan}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findOne({
                    _id: oldIdProduct,
                    plans: {$elemMatch: {_id: oldIdPlan}}
                }, {"plans.$": 1});

                return product?.plans?.[0] || null
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        oldPrice: async ({oldIdProduct, oldIdPlan, oldIdPrice}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findOne({
                    _id: oldIdProduct,
                    plans: {$elemMatch: {_id: oldIdPlan}}
                }, {"plans.$": 1});
                const plan = product?.plans?.[0]

                //@ts-ignore
                const pricePlans = plan?.prices?.find(price => price?._id?.toString() === oldIdPrice?.toString())

                return pricePlans || null
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    Invoice: {
        order: async ({idOrder}, {id}, contextValue, info) =>  {
            try {
                const order = await Order.findById(idOrder);

                return order
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        user: async ({idUser}, {id}, contextValue, info) =>  {
            try {
                const user = await User.findById(idUser);

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
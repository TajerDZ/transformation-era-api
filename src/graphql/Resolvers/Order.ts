import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Invoice, Order, Product, User} from "../../models/index.js";
import {Schema, Types} from "mongoose";
import {buildFilter} from "../../helpers/index.js";
import {withFilter} from "graphql-subscriptions";
import {pubsub} from "../../index.js";

dotenv.config();


export const resolvers = {
    Query: {
        order: async (parent, {id}, contextValue, info) =>  {
            try {
                const order = await Order.findById(id);

                return order
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
        product: async ({idProduct}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findById(idProduct);

                return product
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    Mutation: {
        createOrder: async (parent, {content}, contextValue, info) =>  {
            try {
                let order = await Order.create({
                    ...content
                })

                return order
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        createOrderClient: async (parent, {content}, {user}, info) =>  {
            try {
                console.log("create order")
                const product = await Product.findOne({
                    _id: content.idProduct,
                    "plans._id": content.idPlan
                }, {"plans.$": 1, type: 1});
                console.log({product})

                const plan = product?.plans?.[0]
                console.log({plan})
                //@ts-ignore
                const pricePlans = plan?.prices?.find(price => price?._id?.toString() === content.idPrice)

                console.log({pricePlans})
                const totalPrice = pricePlans?.value * pricePlans?.duration
                const totalDiscount = (pricePlans?.value * pricePlans?.duration) * pricePlans?.discount / 100
                const totalTva = (pricePlans?.value * pricePlans?.duration) * 0.15

                console.log({totalPrice, totalDiscount, totalTva})
                let order = await Order.create({
                    ...content,
                    section: product.type,
                    price: totalPrice,
                    duration: pricePlans?.duration,
                    status: 'pending',
                    idUser: user._id,
                    timeLine: [{
                        type: "new",
                        createdAt: new Date(),
                        status: "pending"
                    }]
                })

                console.log({order})
                const countInvoice = await Invoice.countDocuments()
                console.log({countInvoice})
                const invoice = await Invoice.create({
                    numberInvoice: (countInvoice + 1).toString(),
                    type: "renew",
                    status: "pending",
                    price: pricePlans?.value,

                    duration: pricePlans?.duration,
                    totalDiscount: totalDiscount,
                    totalPrice: totalPrice - totalDiscount + totalTva,
                    subTotalPrice: totalPrice,
                    tva: totalTva,

                    dueDate: content.renewalDate,
                    idOrder: order._id,
                    idProduct: order.idProduct,
                    idUser: order.idUser
                })
                console.log({invoice})

                await pubsub.publish('ORDER', {order: {order, type: "create"}});

                return order
            } catch (error) {
                console.log({error})
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
                const countInvoice = await Invoice.countDocuments()
                let invoice = await Invoice.create({
                    ...content,
                    numberInvoice: (countInvoice + 1).toString()
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

        renewOrder: async (parent, {idOrder, idPrice, dueDate}, contextValue, info) =>  {
            try {
                const order = await Order.findById(idOrder);

                if (order) {
                    const product = await Product.findOne({
                        _id: order.idProduct,
                        "plans._id": order.idPlan,
                        // "plans.prices._id": order.idPrice
                    }, {"plans.$": 1});

                    const plan = product?.plans?.[0]
                    //@ts-ignore
                    const pricePlans = plan?.prices?.find(price => price?._id?.toString() === idPrice)

                    const totalPrice = pricePlans?.value * pricePlans?.duration
                    const totalDiscount = (pricePlans?.value * pricePlans?.duration) * pricePlans?.discount / 100
                    const totalTva = (pricePlans?.value * pricePlans?.duration) * 0.15

                    const countInvoice = await Invoice.countDocuments()
                    const invoice = await Invoice.create({
                        numberInvoice: (countInvoice + 1).toString(),
                        type: "renew",
                        status: "pending",
                        price: pricePlans?.value,

                        duration: pricePlans?.duration,
                        totalDiscount: totalDiscount,
                        totalPrice: totalPrice - totalDiscount + totalTva,
                        subTotalPrice: totalPrice,
                        tva: totalTva,

                        dueDate: dueDate,
                        idOrder: order._id,
                        idProduct: order.idProduct,
                        idUser: order.idUser
                    })

                    const {ok, value} = await Order.findByIdAndUpdate(idOrder, {
                        idPrice: new Types.ObjectId(idPrice),
                        renewalDate: dueDate,
                        price: totalPrice,
                        $push: {
                            timeLine: {
                                type: "renew",
                                createdAt: new Date(),
                                status: "pending"
                            }
                        }
                    }, {includeResultMetadata: true, new: true});


                    await pubsub.publish('ORDER', {order: {order, type: "renew"}});
                    return {
                        data: value,
                        status: ok === 1
                    }
                } else {
                    return {data: null, status: false}
                }
            } catch (error) {
                console.log(error)
                throw new GraphQLError(error)
            }
        },

        upgradeOrder: async (parent, {idOrder, idPlan, idPrice, dueDate}, contextValue, info) =>  {
            try {
                const order = await Order.findById(idOrder);

                if (order) {
                    const product = await Product.findOne({
                        _id: order.idProduct,
                        "plans._id": idPlan,
                        // "plans.prices._id": idPrice
                    }, {"plans.$": 1});

                    const plan = product?.plans?.[0]
                    //@ts-ignore
                    const pricePlans = plan?.prices?.find(price => price?._id?.toString() === idPrice)

                    const totalPrice = pricePlans?.value * pricePlans?.duration
                    const totalDiscount = (pricePlans?.value * pricePlans?.duration) * pricePlans?.discount / 100
                    const totalTva = (pricePlans?.value * pricePlans?.duration) * 0.15

                    const countInvoice = await Invoice.countDocuments()
                    const invoice = await Invoice.create({
                        numberInvoice: (countInvoice + 1).toString(),
                        type: "upgrade",
                        status: "pending",
                        price: pricePlans?.value,

                        duration: pricePlans?.duration,
                        totalDiscount: totalDiscount,
                        totalPrice: totalPrice - totalDiscount + totalTva,
                        subTotalPrice: totalPrice,
                        tva: totalTva,

                        dueDate: dueDate,
                        idOrder: order._id,
                        idProduct: order.idProduct,
                        idUser: order.idUser
                    })

                    const {ok, value} = await Order.findByIdAndUpdate(idOrder, {
                        idPrice: new Types.ObjectId(idPrice),
                        idPlan: new Types.ObjectId(idPlan),
                        renewalDate: dueDate,
                        price: totalPrice,
                        $push: {
                            timeLine: {
                                type: "upgrade",
                                createdAt: new Date(),
                                status: "pending",
                                oldIdProduct: order.idProduct,
                                oldIdPlan: order.idPlan,
                                oldIdPrice: order.idPrice,
                            }
                        }
                    }, {includeResultMetadata: true, new: true});

                    await pubsub.publish('ORDER', {order: {order, type: "upgrade"}});
                    return {
                        data: value,
                        status: ok === 1
                    }
                } else {
                    return {data: null, status: false}
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    Subscription: {
        order: {
            subscribe: withFilter(
                () => pubsub.asyncIterableIterator(['ORDER']),
                ({order}, {}) => order
            )
        }
    }
}
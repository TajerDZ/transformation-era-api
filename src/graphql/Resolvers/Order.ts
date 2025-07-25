import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Invoice, Notifications, Order, Product, User} from "../../models/index.js";
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
                    options.sort = {updatedAt: -1};
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
                    options.sort = {updatedAt: -1};
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
        product: async ({idProduct}, {id}, contextValue, info) =>  {
            try {
                const product = await Product.findById(idProduct);

                return product
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
        pricePlan: async ({idProduct, idPlan, idPrice}, {id}, contextValue, info) =>  {
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
        createOrder: async (parent, {content}, contextValue, info) =>  {
            try {
                // let orderOne = await Order.findOne({domainName: content.domain})
                // if (orderOne) {
                //     return new GraphQLError("domain already exist")
                // }

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
                // let orderOne = await Order.findOne({domainName: content.domain})
                // if (orderOne) {
                //     return new GraphQLError("domain already exist")
                // }

                const product = await Product.findOne({
                    _id: content.idProduct,
                    "plans._id": content.idPlan
                }, {"plans.$": 1, type: 1});

                const plan = product?.plans?.[0]
                //@ts-ignore
                const pricePlans = plan?.prices?.find(price => price?._id?.toString() === content.idPrice)

                const totalDiscount = (pricePlans?.value * pricePlans?.discount) / 100
                const totalTva = pricePlans?.value * 0.15

                const totalPrice = pricePlans?.value - totalDiscount

                console.log(pricePlans?.value, {totalDiscount, totalTva, totalPrice})
                let order = await Order.create({
                    ...content,
                    section: product.type,
                    price: totalPrice,
                    duration: pricePlans?.duration,
                    status: 'pending',
                    idUser: user._id,
                    updated: true,
                    timeLine: [{
                        type: "new",
                        createdAt: new Date(),
                        status: "pending",

                        idProduct: product._id,
                        //@ts-ignore
                        idPlan: plan?._id,
                        //@ts-ignore
                        idPrice: pricePlans?._id,
                        renewalDate: content.renewalDate,
                        price: totalPrice,
                        duration: pricePlans?.duration
                    }]
                })

                const createNotifications = await Notifications.create({
                    title: "طلب جديد",
                    msg: "قام عميل بطلب جديد",
                    idUser: user._id,
                    type: "info"
                })
                await pubsub.publish('CREATE_NOTIFICATIONS', {createNotifications});
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

        changeStatusOrder: async (parent, {id, status}, contextValue, info) =>  {
            try {
                const order = await Order.findById(id);

                console.log({order})
                const lastTimeLine = order.timeLine[order.timeLine.length - 1]
                let result = null

                console.log({timeLine: order.timeLine})
                console.log({lastTimeLine})
                console.log(status)
                if(status == "accepted") {
                    result = await Order.findOneAndUpdate({
                        _id: order._id,
                        //@ts-ignore
                        "timeLine._id": lastTimeLine?._id
                    }, {
                        updated: false,
                        status: "paid",
                        idPlan: lastTimeLine?.idPlan,
                        idPrice: lastTimeLine?.idPrice,
                        price: lastTimeLine?.price,
                        duration: lastTimeLine?.duration,
                        renewalDate: lastTimeLine?.renewalDate,
                        $set: {
                            "timeLine.$.status": status
                        },
                    }, {new: true});
                    console.log({result})
                    return {
                        data: result,
                        status: !!result
                    }
                }
                if(status == "rejected") {

                    result = await Order.findOneAndUpdate({
                        _id: order._id,
                        //@ts-ignore
                        "timeLine._id": lastTimeLine?._id
                    }, {
                        updated: false,
                        status: order.timeLine.length == 1 ? "rejected" : order.status,
                        $set: {
                            "timeLine.$.status": status
                        },
                    }, {new: true});
                    console.log({result})
                    return {
                        data: result,
                        status: !!result
                    }
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

                    const totalDiscount = pricePlans?.value * pricePlans?.discount / 100
                    const totalTva = pricePlans?.value * 0.15

                    const totalPrice = pricePlans?.value - totalDiscount

                    const {ok, value} = await Order.findByIdAndUpdate(idOrder, {
                        updated: true,
                        $push: {
                            timeLine: {
                                type: "renew",
                                createdAt: new Date(),
                                status: "pending",

                                idProduct: product._id,
                                //@ts-ignore
                                idPlan: plan._id,
                                idPrice: idPrice,
                                renewalDate: dueDate,
                                price: totalPrice,
                                duration: pricePlans?.duration,
                            }
                        }
                    }, {includeResultMetadata: true, new: true});

                    const createNotifications = await Notifications.create({
                        title: "طلب تجديد",
                        msg: "قام عميل بطلب تجديد",
                        idUser: order.idUser,
                        type: "info"
                    })
                    await pubsub.publish('CREATE_NOTIFICATIONS', {createNotifications});
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

                    const totalDiscount = pricePlans?.value * pricePlans?.discount / 100
                    const totalTva = pricePlans?.value * 0.15

                    const totalPrice = pricePlans?.value - totalDiscount

                    const {ok, value} = await Order.findByIdAndUpdate(idOrder, {
                        updated: true,
                        $push: {
                            timeLine: {
                                type: "upgrade",
                                createdAt: new Date(),
                                status: "pending",

                                idProduct: product._id,
                                //@ts-ignore
                                idPlan: plan._id,
                                idPrice: idPrice,
                                renewalDate: dueDate,
                                price: totalPrice,
                                duration: pricePlans?.duration
                            }
                        }
                    }, {includeResultMetadata: true, new: true});

                    const createNotifications = await Notifications.create({
                        title: "طلب ترقية",
                        msg: "قام عميل بطلب ترقية",
                        idUser: order.idUser,
                        type: "info"
                    })

                    await pubsub.publish('CREATE_NOTIFICATIONS', {createNotifications});
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
                ({order}, {}) => true
            )
        }
    }
}
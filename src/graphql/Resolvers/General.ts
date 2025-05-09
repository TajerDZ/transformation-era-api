import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Invoice, Order, User} from "../../models/index.js";

dotenv.config();

export const resolvers = {
    Query: {
        homeStatistics: async (parent, {}, {}, info) =>  {
            try {
                const numberClients = await User.countDocuments({role: "user"})
                const numberInvoices = await Invoice.countDocuments({})
                const numberActiveSubscriptions = await Order.countDocuments({"status": "active"})
                const totalRevenue = await Invoice.aggregate([
                    {$match: {status: "paid"}},
                    {$group: {_id: null, total: {$sum: "$price"}}}
                ])

                const topProducts = await Order.aggregate([
                    {$match: {status: "active"}},
                    {$group: {
                        _id: '$idProduct',
                        total: { $sum: 1 }
                    }},
                    {$sort: { total: -1 }},
                    {$limit: 5},
                    {$lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product'
                    }},
                    {$unwind: {path: '$product', preserveNullAndEmptyArrays: false}},
                    {$project: {
                        _id: 0,
                        product: '$product',
                        total: 1
                    }}
                ]);

                const hostingPlan = await Order.aggregate([
                    {$match: {status: 'active'}},
                    {$lookup: {
                        from: 'products',
                        localField: 'idProduct',
                        foreignField: '_id',
                        as: 'product'
                    }},
                    {$unwind: '$product'},
                    {$match: {'product.type': 'hosting_plan'}},
                    {$group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        totalRevenue: { $sum: '$price' }
                    }},
                    {$project: {
                        _id: 0,
                        month: {
                            $concat: [
                                { $toString: '$_id.year' },
                                '-',
                                {$cond: [
                                    { $lt: ['$_id.month', 10] },
                                    { $concat: ['0', { $toString: '$_id.month' }] },
                                    { $toString: '$_id.month' }
                                ]}
                            ]
                        },
                        totalRevenue: 1
                    }},
                    { $sort: { month: 1 } }
                ]);

                const domains = await Order.aggregate([
                    {$match: {status: 'active'}},
                    {$lookup: {
                        from: 'products',
                        localField: 'idProduct',
                        foreignField: '_id',
                        as: 'product'
                    }},
                    {$unwind: '$product'},
                    {$match: {'product.type': 'domains'}},
                    {$group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        totalRevenue: { $sum: '$price' }
                    }},
                    {$project: {
                        _id: 0,
                        month: {
                            $concat: [
                                { $toString: '$_id.year' },
                                '-',
                                {$cond: [
                                    { $lt: ['$_id.month', 10] },
                                    { $concat: ['0', { $toString: '$_id.month' }] },
                                    { $toString: '$_id.month' }
                                ]}
                            ]
                        },
                        totalRevenue: 1
                    }},
                    { $sort: { month: 1 } }
                ]);

                const productsServices = await Order.aggregate([
                    {$match: {status: 'active'}},
                    {$lookup: {
                        from: 'products',
                        localField: 'idProduct',
                        foreignField: '_id',
                        as: 'product'
                    }},
                    {$unwind: '$product'},
                    {$match: {'product.type': 'products_services'}},
                    {$group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        totalRevenue: { $sum: '$price' }
                    }},
                    {$project: {
                        _id: 0,
                        month: {
                            $concat: [
                                { $toString: '$_id.year' },
                                '-',
                                {$cond: [
                                    { $lt: ['$_id.month', 10] },
                                    { $concat: ['0', { $toString: '$_id.month' }] },
                                    { $toString: '$_id.month' }
                                ]}
                            ]
                        },
                        totalRevenue: 1
                    }},
                    {$sort: { month: 1 }}
                ]);

                return {
                    numberCustomers:   numberClients,
                    numberInvoices:   numberInvoices,
                    numberActiveSubscriptions:   numberActiveSubscriptions,
                    totalRevenue:   totalRevenue?.[0]?.total || 0,

                    topProducts: topProducts,
                    hostingPlan: hostingPlan,
                    domains: domains,
                    productsServices: productsServices
                }
            } catch (error) {
                console.log("basicStatistics", error)
                throw new GraphQLError(error)
            }
        },
        clientStatistics: async (parent, {idUser}, {}, info) =>  {
            try {
                const totalOrder = await Order.aggregate([
                    {$match: {idUser}},
                    {$group: {
                        _id: '$idProduct',
                        total: { $sum: 1 }
                    }},
                    {$lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product'
                    }},
                    {$unwind: { path: '$product', preserveNullAndEmptyArrays: false }},
                    {$project: {
                        _id: 0,
                        product: '$product',
                        total: 1
                    }}
                ])

                return totalOrder
            } catch (error) {
                console.log("basicStatistics", error)
                throw new GraphQLError(error)
            }
        },


    },

}
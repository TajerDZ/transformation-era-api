import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Invoice, Order, User} from "../../models/index.js";
import {Types} from "mongoose";
import {getAccountDetail, getCpanel} from "../../helpers/index.js";

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
                    {$match: {status: "paid"}},
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
                    {$match: {status: 'paid', section: 'hosting_plan'}},
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
                    {$match: {status: 'paid', section: 'domains'}},
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
                    {$match: {status: 'paid', section: 'products_services'}},
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
                const numberInvoices = await Invoice.countDocuments({status: "paid", idUser})

                const numberHostingPlan = await Order.aggregate([
                    {$match: {status: 'paid', section: 'hosting_plan', idUser: new Types.ObjectId(idUser)}},
                    {$count: 'totalOrders'},
                ]);

                const numberDomains = await Order.aggregate([
                    {$match: {status: 'paid', section: 'domains', idUser: new Types.ObjectId(idUser)}},
                    {$count: 'totalOrders'},
                ]);

                const numberProductsServices = await Order.aggregate([
                    {$match: {status: 'paid', section: 'products_services', idUser: new Types.ObjectId(idUser)}},
                    {$count: 'totalOrders'}
                ]);

                return {
                    numberProductsServices: numberProductsServices?.[0]?.totalOrders || 0,
                    numberDomains: numberDomains?.[0]?.totalOrders || 0,
                    numberHostingPlan: numberHostingPlan?.[0]?.totalOrders || 0,
                    numberInvoices
                }
            } catch (error) {
                console.log("basicStatistics", error)
                throw new GraphQLError(error)
            }
        },

        cpanel: async (parent, {idOrder}, {}, info) =>  {
            try {
                const order = await Order.findById(idOrder);

                if (order && order !== undefined && order !== null) {
                    const domain = order.domainName;
                    const {status, data} = await getAccountDetail(domain)

                    if (status === 200 && data?.data?.acct?.length > 0) {
                        const acct = data?.data?.acct[0];
                        return acct
                    }
                    return null
                }

                return null
            } catch (error) {
                console.log("basicStatistics", error)
                throw new GraphQLError(error)
            }
        },

        cpanelUrl: async (parent, {userName}, {}, info) =>  {
            try {
                if (userName !== undefined && userName !== null && userName !== "") {
                    const {status, data} = await getCpanel(userName)

                    if (status === 200 && data?.data !== undefined && data?.data !== null) {
                        const url = data?.data?.url;
                        return url
                    }
                    return null
                }

                return null
            } catch (error) {
                console.log("basicStatistics", error)
                throw new GraphQLError(error)
            }
        },
    },

}
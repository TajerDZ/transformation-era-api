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

                return {
                    numberCustomers:   numberClients,
                    numberInvoices:   numberInvoices,
                    numberActiveSubscriptions:   numberActiveSubscriptions,
                    totalRevenue:   totalRevenue?.[0]?.total || 0,
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
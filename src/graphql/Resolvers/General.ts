import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {User} from "../../models/index.js";

dotenv.config();

export const resolvers = {
    Query: {
        basicStatistics: async (parent, {idWorkspace}, {employee}, info) =>  {
            try {

                return {
                    totalOrder:     0,
                    totalRevenue:   0
                }
            } catch (error) {
                console.log("basicStatistics", error)
                throw new GraphQLError(error)
            }
        },

        alertsUser: async (parent, {idUser, idWorkspace}, {user}, info) =>  {
            try {
                let user = await User.findById(idUser);

                return {
                    emailVerify:    user?.emailVerify || false
                }
            } catch (error) {
                console.log("alertsUser", error)
                throw new GraphQLError(error)
            }
        },

    },

}
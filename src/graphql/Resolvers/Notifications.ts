import {GraphQLError} from "graphql";
import dotenv from 'dotenv';
import {Notifications, User} from "../../models/index.js";
import {withFilter} from "graphql-subscriptions";
import {pubsub} from "../../index.js";

dotenv.config();

export const resolvers = {
    Query: {
        allNotifications: async (parent, {pagination}, contextValue, info) =>  {
            try {
                const options: {limit?: number, skip?: number} = {};
                if (pagination) {
                    const {limit, page} = pagination;
                    options.limit = limit;
                    options.skip = (page - 1) * limit;
                }

                const notifications = await Notifications.find({}, null, options).sort({createdAt: -1})

                return notifications
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        
    },

    Notifications: {
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
        createNotifications: async (parent, {content}, contextValue, info) =>  {
            try {
                let notifications = await Notifications.create(content)
                await pubsub.publish('CREATE_NOTIFICATIONS', {createNotifications: notifications});

                return notifications
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updateNotifications: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let result = null

                if(Object.keys(content).length > 0) {
                    result = await Notifications.findByIdAndUpdate(id, content, {includeResultMetadata: true, new: true});
                }

                return {
                    data: result?.value,
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteNotifications: async (parent, {id}, contextValue, info) =>  {
            try {
                // @ts-ignore
                const {modifiedCount} = await Notifications?.deleteById(id)

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        }
    },

    Subscription: {
        newNotifications: {
            subscribe: withFilter(
                () => pubsub.asyncIterableIterator(['CREATE_NOTIFICATIONS']),
                ({createNotifications}, {}) => {
                    console.log({createNotifications})
                    return createNotifications
                }
            ),
            resolve: ({ createNotifications }) => createNotifications
        },
    }
}


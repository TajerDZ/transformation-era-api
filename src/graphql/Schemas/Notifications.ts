export const typeDefs = `#graphql
    type Query {
        allNotifications(pagination: Pagination): [Notifications!] @auth #@scope(requires: [notifications])
    }
    
    type Mutation {
        createNotifications(content: contentNotifications!): Notifications! @auth #@scope(requires: [notifications])
        updateNotifications(id: ID!, content: contentNotifications!): StatusUpdateWithNotifications @auth #@scope(requires: [notifications])
        deleteNotifications (id: ID!): StatusDelete @auth #@scope(requires: [notifications])
    }

    type Subscription {
        createNotifications: Notifications!
    }
    
    type StatusUpdateWithNotifications {
        data:   Notifications
        status: Boolean
    }
    
    type Notifications {
        id:             ID
        title:          String
        msg:            String
        type:           String

        user: User
    
        createdAt:  Date
        updatedAt:  Date
    }
    
    input contentNotifications {
        title:          String
        msg:            String
        type:           String
    }
`
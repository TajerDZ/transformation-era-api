export const typeDefs = `#graphql
    type Query {
        allNotifications(idWorkspace: ID, pagination: Pagination): [Notifications!] @auth @scope(requires: [notifications])
    }
    
    type Mutation {
        createNotifications(content: contentNotifications!): Notifications! @auth @scope(requires: [notifications])
        updateNotifications(id: ID!, content: contentNotifications!): StatusUpdateWithNotifications @auth @scope(requires: [notifications])
        deleteNotifications (id: ID!): StatusDelete @auth @scope(requires: [notifications])
    }

    type Subscription {
        newNotifications(idWorkspace: ID): Notifications!
    }
    
    type StatusUpdateWithNotifications {
        data:   Notifications
        status: Boolean
    }
    
    type Notifications {
        id:             ID
        title:          String
        msg:            String
        icon:           String
        type:           String
    
        createdAt:  Date
        updatedAt:  Date
    }
    
    input contentNotifications {
        title:          String
        msg:            String
        icon:           String
        type:           String
    }
`
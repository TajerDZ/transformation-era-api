export const typeDefs = `#graphql
    type Query {
        order(id: ID): Order @auth @scope(requires: [order])
        allOrder(idWorkspace: ID, filter: [Filter], pagination: Pagination): OrderWithTotal @auth @scope(requires: [order])
    }
    
    type Mutation {
        createOrder(content: contentOrder!): Order! @auth @scope(requires: [order])
        updateOrder(id: ID!, content: contentOrder!): StatusUpdateOrder @auth @scope(requires: [order])
        deleteOrder (id: ID!): StatusDelete @auth @scope(requires: [order])
        deleteMultiOrder (id: [ID!]!): StatusDelete @auth @scope(requires: [order])
    }
    
    type OrderWithTotal {
        data: [Order!]
        total: Int
    }
    
    type StatusUpdateOrder {
        data: Order
        status: Boolean
    }
    
    type Order {
        id:         ID
        section:     String
        fullName:       String
        email: String

        phone:     String

        product: [Product]
    
        createdAt:  Date
        updatedAt:  Date
        deletedAt:  Date
        deleted:    Boolean
    }
    
    input contentOrder {
        section:     String
        fullName:       String
        email: String

        phone:     String

        idProduct: ID
    }
`
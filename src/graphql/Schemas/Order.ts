export const typeDefs = `#graphql
    type Query {
        order(id: ID): Order @auth #@scope(requires: [order])
        allOrder(filter: [Filter], pagination: Pagination): OrderWithTotal @auth #@scope(requires: [order])
    }
    
    type Mutation {
        createOrder(content: contentOrder!): Order! @auth #@scope(requires: [order])
        updateOrder(id: ID!, content: contentOrder!): StatusUpdateOrder @auth #@scope(requires: [order])
        deleteOrder (id: ID!): StatusDelete @auth #@scope(requires: [order])
        deleteMultiOrder (id: [ID!]!): StatusDelete @auth #@scope(requires: [order])
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

        user:     User
        product: Product

        plan: PlansProduct
        pricePlans: PricesPlansProduct
        price:  Float
        renewalDate: Date
        status: String

        timeLine: [TimeLineOrder]
    
        createdAt:  Date
        updatedAt:  Date
        deletedAt:  Date
        deleted:    Boolean
    }

    type TimeLineOrder {
        id:         ID
        type: String
        createdAt: Date
        status: String

        oldProduct: Product
        oldPlan: PlansProduct
        oldPrice: PricesPlansProduct
    }
    
    input contentOrder {
        section:     String
        idUser:    ID
        idProduct: ID
        
        idPlan: ID
        idPrice: ID
        price:  Float
        renewalDate: Date
        status: String

        timeLine: [contentTimeLine]
    }

    input contentTimeLine {
        type: String
        createdAt: Date
        status: String
    
        oldIdProduct: ID
        oldIdPlan: ID
        oldIdPrice: ID
    }
`
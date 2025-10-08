export const typeDefs = `#graphql
    type Query {
        order(id: ID): Order @auth #@scope(requires: [order])
        allOrder(filter: [Filter], pagination: Pagination): OrderWithTotal @auth #@scope(requires: [order])
        allOrderClient(idUser: ID, filter: [Filter], pagination: Pagination): OrderWithTotal @auth #@scope(requires: [order])
    }
    
    type Mutation {
        createOrder(content: contentOrder!): Order! @auth #@scope(requires: [order])
        createOrderClient(content: contentOrderClient!): Order! @auth #@scope(requires: [order])
        updateOrder(id: ID!, content: contentOrder!): StatusUpdateOrder @auth #@scope(requires: [order])
        changeStatusOrder(id: ID!, status: String): StatusUpdateOrder @auth #@scope(requires: [order])
        deleteOrder (id: ID!): StatusDelete @auth #@scope(requires: [order])
        deleteMultiOrder (id: [ID!]!): StatusDelete @auth #@scope(requires: [order])
        
        renewOrder(idOrder: ID!, idPrice: ID, dueDate: Date): StatusUpdateOrder @auth #@scope(requires: [order]
        upgradeOrder(idOrder: ID!, idPlan: ID, idPrice: ID): StatusUpdateOrder @auth #@scope(requires: [order]
    }

    type Subscription {
        order: OrderWithType
    }
    
    type OrderWithType {
        data: Order!
        type: String
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
        domainName: String
        updated: Boolean
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

        price: Float
        duration: Int
        renewalDate: Date
        
        product: Product
        plan: PlansProduct
        pricePlan: PricesPlansProduct
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
        domainName: String

        timeLine: [contentTimeLine]
    }
    
    input contentOrderClient {
        idProduct: ID
        idPlan: ID
        idPrice: ID
        renewalDate: Date
    }

    input contentTimeLine {
        type: String
        createdAt: Date
        status: String
        
        idProduct: ID
        price: Float
        duration: Int
        idPlan: ID
        idPrice: ID
        renewalDate: ID
    }
`
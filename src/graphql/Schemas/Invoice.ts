export const typeDefs = `#graphql
    type Query {
        invoice(id: ID): Invoice @auth #@scope(requires: [order])
        allInvoice(filter: [Filter], pagination: Pagination): InvoiceWithTotal @auth #@scope(requires: [order])
        allInvoiceClient(idUser: ID, filter: [Filter], pagination: Pagination): InvoiceWithTotal @auth #@scope(requires: [order])
    }
    
    type Mutation {
        createInvoice(content: contentInvoice!): Invoice! @auth #@scope(requires: [order])
        updateInvoice(id: ID!, content: contentInvoice!): StatusUpdateInvoice @auth #@scope(requires: [order])
        deleteInvoice(id: ID!): StatusDelete @auth #@scope(requires: [order])
    }
    
    type InvoiceWithTotal {
        data: [Invoice!]
        total: Int
    }

    type StatusUpdateInvoice {
        data: Invoice
        status: Boolean
    }

    type Invoice {
        id:         ID

        numberInvoice:  String
        totalPrice:     Float
        file:           String
        status:           String
        linkPayment:           String
        date:           Date

        order: Order
        user: User
        
        createdAt:  Date
        updatedAt:  Date
    }
    
    input contentInvoice {
        numberInvoice:  String
        totalPrice:     Float
        file:           String
        status:           String
        date:           Date
        idOrder:         ID
        idUser:         ID
    }
`
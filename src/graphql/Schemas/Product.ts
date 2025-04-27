export const typeDefs = `#graphql
    type Query {
        product(id: ID): Product @auth #@scope(requires: [product])
        allProduct(filter: [Filter], pagination: Pagination): ProductWithTotal @auth #@scope(requires: [product])
    }
    
    type Mutation {
        createProduct(content: contentProduct!): Product! @auth #@scope(requires: [product])
        updateProduct(id: ID!, content: contentProduct!): StatusUpdateProduct @auth #@scope(requires: [product])
        deleteProduct (id: ID!): StatusDelete @auth #@scope(requires: [product])
        deleteMultiProduct (id: [ID!]!): StatusDelete @auth #@scope(requires: [product])
    }

    type ProductWithTotal {
        data: [Product!]
        total: Int
    }

    type StatusUpdateProduct {
        data: Product
        status: Boolean
    }

    type Product {
        id:         ID
        thumbnail:     String
        name:       String
        price: Float
        type: String

        description:     String

        details: [String]
    
        createdAt:  Date
        updatedAt:  Date
        deletedAt:  Date
        deleted:    Boolean
    }

    input contentProduct {
        thumbnail:     String
        name:       String
        price: Float
        type: String

        description:     String

        details: [String]
    }
`
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


        addPlanToProduct(idProduct: ID!, content: contentPlansProduct!): StatusUpdateProduct! @auth #@scope(requires: [product])
        updatePlanInProduct(idProduct: ID!, id: ID!, content: contentPlansProduct!): StatusUpdateProduct @auth #@scope(requires: [product])
        deletePlanFromProduct (idProduct: ID!, id: ID!): StatusUpdateProduct @auth #@scope(requires: [product])
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
        activations: Boolean

        plans: [PlansProduct]
    
        createdAt:  Date
        updatedAt:  Date
        deletedAt:  Date
        deleted:    Boolean
    }

    type PlansProduct {
        id:         ID
        name:       String
        details: [DetailsPlansProduct]
        prices: [PricesPlansProduct]
    }

    type DetailsPlansProduct {
        id:         ID
        key: String
        value: String
    }

    type PricesPlansProduct {
        id:         ID
        key: String
        value: Float
        discount: Float
        duration: Int
    }

    input contentProduct {
        thumbnail:     String
        name:       String
        price: Float
        type: String

        description:     String
        activations: Boolean

        plans: [contentPlansProduct]
    }

    input contentPlansProduct {
        name:       String
        details: [contentDetailsPlansProduct]
        prices: [contentPricesPlansProduct]
    }

    input contentDetailsPlansProduct {
        key: String
        value: String
    }

    input contentPricesPlansProduct {
        _id:         ID
        key: String
        value: Float
        discount: Float
        duration: Int
    }
`
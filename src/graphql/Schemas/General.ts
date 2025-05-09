export const typeDefs = `#graphql
    type Query {
        homeStatistics: HomeStatistics @auth
        clientStatistics(idUser: ID): [ClientStatistics] @auth
        
    }

    type HomeStatistics {
        numberCustomers:     Int
        numberInvoices:     Int
        numberActiveSubscriptions:     Int
        totalRevenue:     Float
        
        topProducts: [TopProduct]
        
        hostingPlan:    [HostingPlan]
        domains:    [Domains]
        productsServices:    [ProductsServices]
    }

    type TopProduct {
        product:   Product
        total:     Int
    }

    type HostingPlan {
        totalRevenue:     Float
        month:     Int
    }

    type Domains {
        totalRevenue:     Float
        month:     Int
    }

    type ProductsServices {
        totalRevenue:     Float
        month:     Int
    }



    type ClientStatistics {
        product:   Product
        total:     Int
    }
    
`
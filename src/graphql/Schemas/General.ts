export const typeDefs = `#graphql
    type Query {
        homeStatistics: HomeStatistics @auth
        clientStatistics(idUser: ID): ClientStatistics @auth
        
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
        month:     String
    }

    type Domains {
        totalRevenue:     Float
        month:     String
    }

    type ProductsServices {
        totalRevenue:     Float
        month:     String
    }



    type ClientStatistics {
        numberProductsServices:     Int
        numberDomains:     Int
        numberHostingPlan:     Int
        numberInvoices:     Int
    }
    
`
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
    }

    type ClientStatistics {
        product:   Product
        total:     Int
    }
    
`
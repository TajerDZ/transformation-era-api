export const typeDefs = `#graphql
    type Query {
        homeStatistics: HomeStatistics @auth
        
    }

    type HomeStatistics {
        numberCustomers:     Int
        numberInvoices:     Int
        numberActiveSubscriptions:     Int
        totalRevenue:     Float
    }
    
`
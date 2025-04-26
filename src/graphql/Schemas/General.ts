export const typeDefs = `#graphql
    type Query {
        basicStatistics: HomeStatistics @auth
        alertsUser(idUser: ID): AlertUser @auth
        
    }

    type HomeStatistics {
        totalOrder:     Int
        totalRevenue:   Float
    }
    
    type AlertUser {
        emailVerify:    Boolean
    }
`
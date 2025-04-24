export const typeDefs = `#graphql
    type Query {
        basicStatistics(idWorkspace: ID): HomeStatistics @auth
        alertsUser(idUser: ID, idWorkspace: ID): AlertUser @auth
        
    }

    type HomeStatistics {
        totalOrder:     Int
        totalRevenue:   Float
    }
    
    type AlertUser {
        emailVerify:    Boolean
    }
`
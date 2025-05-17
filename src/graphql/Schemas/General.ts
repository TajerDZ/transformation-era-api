export const typeDefs = `#graphql
    type Query {
        homeStatistics: HomeStatistics @auth
        clientStatistics(idUser: ID): ClientStatistics @auth

        cpanel(idOrder: ID!): Cpanel @auth
        cpanelUrl(userName: String!): String @auth
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
    
    type Cpanel {
        temporary:  Float
        is_locked:  Int
        suspendreason: String
        diskused:   String
        domain:     String
        ip:         String
        maxpop:     String
        maxftp:     String
        max_emailacct_quota: String
        uid:        String
        maxsql:     String
        theme:        String
        backup:       Int
        user:         String
        suspendtime:  Float
        inodesused:   Float
        maxlst:       Float
        email:        String
        has_backup:   Int
        disklimit:    String
        maxsub:       String
        suspended:    Int
        inodeslimit:  String
        startdate:    String
    }
`
import {Types} from "mongoose";

export const typeDefs = `#graphql
    type Query {
        logIn(content: loginInfo): AuthUser!
        user(id: ID): User @auth @scope(requires: [user])
        allUser: [User!] @auth @scope(requires: [user])
        
        currentUser: User! @auth
        refreshToken: AuthUser
    }

    type Mutation {
        singUp(content: contentUser!): User!
        createUser(content: contentUser!): User! @auth
        updateUser(id: ID!, content: contentProfile!): StatusUpdateWithUser @auth @scope(requires: [user])
        deleteUser ( id: ID! ): StatusDelete @auth @scope(requires: [user])

        updateMyPassword(id: ID!, content: contentPassword!): StatusUpdate @auth @scope(requires: [user])

        checkVerificationUser(email: String, code: String): StatusUpdateWithUser!
        resendVerificationEmail(email: String): StatusUpdate!

        forgetPassword(email: String): StatusUpdate!
        checkOTPPassword(email: String, code: String): StatusUpdate!
        changePassword(content: contentChangePassword): StatusUpdate!

        activeUser (id: ID!, activation: Boolean): StatusUpdate! @auth @scope(requires: [user])
        logOut: StatusDelete
    }

    type StatusUpdateWithUser {
        data: User
        status: Boolean
    }

    type AuthUser {
        token: String!
        user:  User
    }

    input loginInfo {
        email:      String!
        password:   String!
    }

    type Image {
        url: String #@imgUrl
    }

    type User {
        id:                 ID
        thumbnail:               String
        name:               String
        email:              String
        phone:              String
        
        role:               Role

        activation:         Boolean
        emailVerify:        Boolean

        permissionGroup:      PermissionGroup
        
        createdAt:  Date
        updatedAt:  Date
        deletedAt:  Date
    }

    input contentUser {
        thumbnail:       String
        name:       String
        email:      String
        phone:      String
        
        role:       Role
        password:   String
        idPermissionGroup:      ID
    }

    input contentProfile {
        name:               String
        email:              String
        phone:              String
    }

    input contentPassword {
        oldPassword:    String!
        password:       String!
    }

    input contentChangePassword {
        email:              String!
        code:              String!
        password:           String!
    }
`
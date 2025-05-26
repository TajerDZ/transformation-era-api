import { makeExecutableSchema } from '@graphql-tools/schema';
import {GraphQLScalarType, Kind} from 'graphql';
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs"

import {
    typeDefsUser, typeDefsProduct, typeDefsPermission, typeDefsOrder,
    typeDefsNotifications, typeDefsGeneral
} from "./Schemas/index.js"
import {
    resolversUser, resolversProduct, resolversPermission, resolversOrder,
    resolversNotifications, resolversGeneral
} from "./Resolvers/index.js"

import {authDirectiveTransformer, scopeDirectiveTransformer} from "./Directives/index.js"
import {Upload, UploadMulti} from "../helpers/index.js";
import {GraphQLError} from "graphql";


const typeDefs = `#graphql
    directive @auth( requires: Role = unknown ) on OBJECT | FIELD_DEFINITION
    directive @scope( requires: [Scopes] = [any] ) on FIELD_DEFINITION

    scalar Date
    scalar Upload
    scalar Time

    type File {
        filename:   String!
        url:        String!
    }

    enum Role {
        owner
        superAdmin
        admin
        user
        unknown
    }

    enum Scopes {
        user
        product
        order
        permission
        notifications
        any
    }

    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
        singleUpload(file: Upload): File
        multiUpload(files: [Upload]): [File]
    }

    type Subscription {
        _empty: String
    }

    type StatusUpdate {
        status: Boolean
    }

    type StatusDelete {
        status: Boolean
    }

    input Filter {
        field: String!
        operator: String!
        value: String
    }

    input Pagination {
        limit: Int!
        page: Int!
    }
`;

const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        serialize(value: Date) { return value.getTime(); },
        parseValue(value: number) { return new Date(value); },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) { new Date(parseInt(ast.value, 10)); }
            return null;
        },
    }),
    Upload: GraphQLUpload,

    Mutation: {
        singleUpload: async (parent, {file}, contextValue, info) =>  {
            try {
                const image = await file
                // console.log({image})

                const imageProduct = await Upload(image)

                return {
                    filename: imageProduct,
                    url: "https://api.assar.sa/images"
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        multiUpload: async (parent, {files}, contextValue, info) =>  {
            try {
                const imagesUpload = await files
                const images = await UploadMulti(imagesUpload)

                let listImages = []
                for (let i = 0; i < images.length; i++) {
                    const image = await images[i]
                    listImages.push({filename: image, url: "https://api.sendibad.shop/images"})
                }

                return listImages
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    }
}

let schema = makeExecutableSchema({
    typeDefs: [
        typeDefs, typeDefsUser, typeDefsProduct, typeDefsPermission, typeDefsOrder,
        typeDefsNotifications, typeDefsGeneral
    ],
    resolvers: [
        resolvers, resolversUser, resolversProduct, resolversPermission, resolversOrder,
        resolversNotifications, resolversGeneral
    ]
});

schema = authDirectiveTransformer(schema)
schema = scopeDirectiveTransformer(schema)

export default schema
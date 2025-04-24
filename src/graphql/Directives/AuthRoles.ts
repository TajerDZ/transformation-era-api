import {defaultFieldResolver, GraphQLError } from "graphql";
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

export default function authDirective(directiveName) {
    let typeDirectiveArgumentMaps = {}
    return {
        authDirectiveTypeDefs: `
            directive @${directiveName}( requires: Role = unknown, ) on OBJECT | FIELD_DEFINITION
            enum Role {
                superAdmin
                admin
                user
                unknown
            }
        `,

        authDirectiveTransformer: (schema) => mapSchema(schema, {
            [MapperKind.TYPE]: type => {
                let authDirective = getDirective(schema, type, directiveName)
                // @ts-ignore
                if(authDirective && authDirective.length > 0) authDirective = authDirective?.[0]
                if (authDirective) typeDirectiveArgumentMaps[type.name] = authDirective
                return undefined
            },

            [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
                let authDirective = getDirective(schema, fieldConfig, directiveName)
                // @ts-ignore
                if(authDirective && authDirective.length > 0) authDirective = authDirective?.[0]
                else authDirective = typeDirectiveArgumentMaps[typeName]

                if (authDirective) {
                    // @ts-ignore
                    const { requires } = authDirective
                    if (requires) {
                        const { resolve = defaultFieldResolver } = fieldConfig

                        fieldConfig.resolve = function (source, args, context, info) {
                            const {user, isAuth} = context

                            if (!isAuth || !user) {
                                throw new GraphQLError(`You must be the authenticated user to get this information`, {
                                    extensions: {
                                        code: 'UNAUTHENTICATED',
                                        http: { status: 401 }
                                    }
                                });
                            }

                            const roleUser = user.role.toLowerCase()

                            if (requires === "unknown") {
                                return resolve(source, args, context, info)
                            }

                            if(!isAuth || !requires.includes(roleUser)) {
                                throw new GraphQLError(`You need following role: ${requires}`, {
                                    extensions: {
                                        code: 'UNAUTHENTICATED',
                                        http: { status: 401 }
                                    }
                                });
                            }

                            return resolve(source, args, context, info)

                        }
                        return fieldConfig
                    }
                }
            }
        })
    }
}
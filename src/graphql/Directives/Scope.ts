import {defaultFieldResolver, GraphQLError } from "graphql";
import { mapSchema, getDirective, MapperKind } from '@graphql-tools/utils'

export default function scopeDirective(directiveName) {
    let typeDirectiveArgumentMaps = {}
    return {
        scopeDirectiveTypeDefs: `
            directive @${directiveName}( requires: [Scopes] = any ) on OBJECT
            enum Scopes {
                user
                product
                order
                permission
                notifications
                any
            }
        `,

        scopeDirectiveTransformer: (schema) => mapSchema(schema, {
            [MapperKind.TYPE]: type => {
                let scopeDirective = getDirective(schema, type, directiveName)
                // @ts-ignore
                if(scopeDirective && scopeDirective.length > 0) scopeDirective = scopeDirective?.[0]
                if (scopeDirective) typeDirectiveArgumentMaps[type.name] = scopeDirective
                return undefined
            },

            [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
                let scopeDirective = getDirective(schema, fieldConfig, directiveName)

                // @ts-ignore
                if(scopeDirective && scopeDirective.length > 0) scopeDirective = scopeDirective?.[0]
                else scopeDirective = typeDirectiveArgumentMaps[typeName]

                if (scopeDirective) {
                    // @ts-ignore
                    const { requires } = scopeDirective
                    if (requires) {
                        const { resolve = defaultFieldResolver } = fieldConfig

                        fieldConfig.resolve = async function (source, args, context, info) {
                            const {user, isAuth, permissions} = context

                            if (requires.includes("any")) {
                                return resolve(source, args, context, info)
                            }

                            if (permissions === undefined || permissions === null || permissions?.length === 0) {
                                console.log("permissions === undefined || permissions === null || permissions?.length === 0")
                                throw new GraphQLError(`You do not have access to: ${requires.join(", ")}`, {
                                    extensions: {
                                        code: 'UNAUTHORIZED',
                                        http: { status: 403 },

                                    }
                                });
                            }

                            const requiredPermission = await Promise.all(permissions?.filter(row => requires.includes(row.table) ));

                            if (requiredPermission === undefined || requiredPermission?.length === 0) {
                                console.log("!requiredPermission || requiredPermission?.length === 0")
                                throw new GraphQLError(`You do not have access to: ${requires.join(", ")}`, {
                                    extensions: {
                                        code: 'UNAUTHORIZED',
                                        http: { status: 403 }
                                    }
                                });
                            }

                            const blockedPermission = await Promise.all(requiredPermission?.filter(row => row.allowedAll == false ));

                            if (blockedPermission?.length > 0) {
                                throw new GraphQLError(`You do not have access to: ${requires.join(", ")}`, {
                                    extensions: {
                                        code: 'UNAUTHORIZED',
                                        http: { status: 403 }
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
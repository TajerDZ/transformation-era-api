import authDirective from "./AuthRoles.js"
import scopeDirective from "./Scope.js"

export const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective('auth')
export const { scopeDirectiveTypeDefs, scopeDirectiveTransformer } = scopeDirective('scope')
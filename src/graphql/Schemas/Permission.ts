export const typeDefs = `#graphql
    type Query {
        permissionGroup(id: ID): PermissionGroup @auth @scope(requires: [permission])
        allPermissionGroup: PermissionGroupWithTotal @auth @scope(requires: [permission])
    }
    
    type Mutation {
        createPermissionGroup(content: contentPermissionGroup!): PermissionGroup! @auth @scope(requires: [permission])
        updatePermissionGroup(id: ID!, content: contentPermissionGroup!): StatusUpdatePermissionGroup @auth @scope(requires: [permission])
        deletePermissionGroup (id: ID!): StatusDelete @auth @scope(requires: [permission])

        addPermissionToPermissionGroup(idPermissionGroup: ID!, content: contentPermission!): StatusUpdatePermissionGroup @auth @scope(requires: [permission])
        updatePermissionInPermissionGroup(idPermissionGroup: ID!, id: ID!, content: contentPermission!): StatusUpdatePermissionGroup @auth @scope(requires: [permission])
        deletePermissionToPermissionGroup(idPermissionGroup: ID!, id: ID!): StatusUpdatePermissionGroup @auth @scope(requires: [permission])
    }
    
    type PermissionGroupWithTotal {
        data: [PermissionGroup!]
        total: Int
    }
    
    type StatusUpdatePermissionGroup {
        data:   PermissionGroup
        status: Boolean
    }
    
    type PermissionGroup {
        id:             ID
        name:          String
        permissions:     [Permission]
    
        createdAt:  Date
        updatedAt:  Date
    }
    
    type Permission {
        id:             ID
        table:          String
        allowedAll:     Boolean
        operations:     [Operations]
    }

    type Operations {
        id:             ID
        name:       String
        allowed:    Boolean
    }
    
    input contentPermissionGroup {
        name:          String
        permissions:     [contentPermission]
    }
    
    input contentPermission {
        table:          String
        allowedAll:     Boolean
        operations:     [contentOperations]
    }

    input contentOperations {
        name:       String
        allowed:    Boolean
    }

`
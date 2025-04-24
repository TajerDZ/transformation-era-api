import {FilterQuery, Types} from "mongoose";
import {PermissionGroupI} from "../models/index.js";
import randToken from "rand-token";
import {GraphQLError} from "graphql/index.js";
import {pubsub} from "../index.js";

export const checkPermission = async (requires: string[], permissionGroup: PermissionGroupI, ) => {
    try {
        if (!permissionGroup) {
            console.log("if01")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        const permissionList = permissionGroup?.permissions

        if (!permissionGroup?.permissions || permissionGroup?.permissions?.length === 0) {
            console.log("if02")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        const requiredPermission = await Promise.all(permissionList?.filter(row => requires.includes(row.table)));

        if (requiredPermission === undefined || requiredPermission?.length === 0) {
            console.log("if03")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        const blockedPermission = await Promise.all(requiredPermission?.filter(row => row.allowedAll == false ));

        if (blockedPermission?.length > 0) {
            console.log("if04")
            return {
                status: false,
                msg: `You do not have access to: ${requires.join(", ")}`
            }
        }

        return true
    } catch (error) {
        console.error(error)
        return {
            status: false,
            msg: `You do not have access to: ${requires.join(", ")}`
        }
    }
}

export const buildFilter = async (conditions: any[]) => {
    try {
        const query: FilterQuery<any>[] = [];

        for (let i = 0; i < conditions.length; i++) {
            const { field, operator, value } = conditions[i];

            const parsedValue = operator === '$in'
                ? JSON.parse(value)
                : Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value;

            const conditionQuery = { [field]: { [operator]: parsedValue } };

            if (field === "createdAt" && value.includes(",")) {
                const [start, end] = value.split(",").map((v) => new Date(v.trim()));

                query.push({[field]: {$gte: start, $lte: end}});
            } else {
                query.push(conditionQuery); // Default to AND
            }
        }

        return { $and: [...query] };
    } catch (error) {
        console.log("Error buildFilter:", error)
        throw new Error(error)
    }
}



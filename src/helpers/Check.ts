import {User } from "../models/index.js";


export const isExistUser = async (id: string) => {
    try {
        if (!id) return false

        const user = await User.findById(id).exec();

        if (user) return user
        else return false
    } catch (error) {
        console.error(error)
    }
}

export const alreadyExistUser = async (email: string, phone: string) => {
    try {
        const user = await User.findOne({deleted: false, $or: [{email}, {phone}]})

        if (user) {
            if (user.email === email && user.phone === phone) return {"message": "account already exists", "code": "ACCOUNT_ALREADY_EXIST"}
            else if (user.email === email) return {"message": "email already exists", "code": "EMAIL_ALREADY_EXIST"}
            else if (user.phone === phone) return {"message": "phone already exists", "code": "PHONE_ALREADY_EXIST"}
        }
        else return false
    } catch (error) {
        console.error(error)
    }
}

export const sameUserAgent = (tokenAgent: string, userAgent: any) => {
    try {
        if (!userAgent || !tokenAgent || userAgent === "" || tokenAgent === "") return null

        let useragent = `${userAgent.browser}: ${userAgent.version}, ${userAgent.platform}: ${userAgent.os}, ${userAgent.source}`

        if (useragent !== tokenAgent) return null
        else return true
    } catch (error) {
        console.error(error)
    }
}

import jwt from 'jsonwebtoken';
import {PermissionGroup, User} from '../models/index.js';
import dotenv from 'dotenv'
dotenv.config();

const SECRET = process.env.SECRET_JWT || ""

export const AuthMiddleware = async (req: any, res: any, next: any) => {
    // Extract Authorization Header
    const authHeader = req.get("Authorization");
    
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    
    // Extract the token and check for token
    const token = authHeader.split(" ")[1];

    if (!token || token === "") {
        req.isAuth = false;
        return next();
    }

    // Verify the extracted token
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, SECRET);
    } catch (err) {
        req.isAuth = false;
        return next();
    }

    // If decoded token is null then set authentication of the request false
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }

    // If the user has valid token then Find the user by decoded token's id
    let authUser = await User.findById(decodedToken?.id);
    if (!authUser) {
        req.isAuth = false;
        return next();
    }

    let employeePermission = await PermissionGroup.findById(authUser?._id);


    req.isAuth = true;
    req.user = authUser;
    req.permissions = employeePermission?.permissions;
    return next();
}
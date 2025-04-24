import {GraphQLError} from "graphql";
import 'dotenv/config'

import {alreadyExistUser, AuthToken, buildFilter, comparePassword, forgetPasswordMail, hashPassword, inviteUserMail, isExistUser, sameUserAgent, verificationMail, VerifyToken} from '../../helpers/index.js';

import {PermissionGroup, User} from './../../models/index.js';
import {Types} from "mongoose";
import RandToken from 'rand-token';

const { uid, generator } = RandToken
const DOMAIN = process.env.DOMAIN

export const resolvers = {
    Query: {
        logIn: async (parent, {content}, {req}, info) =>  {
            try {
                let user = await User.findOne({ email: content.email });

                // If Password don't match
                if (!user) {
                    return new GraphQLError("Email not found", {extensions: {code: "EMAIL_NOT_FOUND", http: { status: 422 }}});
                }

                let isMatch = await comparePassword(content.password, user.password);

                // If Password don't match
                if (!isMatch) {
                    return new GraphQLError("Password incorrect", {extensions: {code: "PASSWORD_INCORRECT", http: { status: 422 }}});
                }

                // If Password don't match
                if (!user.emailVerify) {
                    // @ts-ignore
                    const dateCreated = new Date(user?.createdAt).getTime();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const dateNow = new Date().getTime();
                    const diff = (dateNow - dateCreated) / oneDay;

                    if (diff > 7) {
                        return new GraphQLError("Email not verify", {extensions: {code: "EMAIL_NOT_VERIFY", http: { status: 422 }}});
                    }
                }

                // If Password don't match
                if (!user.activation) {
                    return new GraphQLError("Account is not active", {extensions: {code: "ACCOUNT_NOT_ACTIVE", http: { status: 422 }}});
                }


                // let {ok} = await User.findByIdAndUpdate(user._id, {
                //     firebaseToken: content.firebaseToken
                // }, {includeResultMetadata: true, new: true});

                // Issue Token
                let token = AuthToken({id: user._id}, 365);

                return {token, user}
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        user: async (parent, {id}, contextValue, info) =>  {
            try {
                return await User.findById(id)
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
        allUser: async (parent, {idStore}, contextValue, info) =>  {
            try {
                return await User.find({idStore}).sort({ createdAt: -1 }).exec();
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        currentUser: async (parent, args, {isAuth, user}, info) => {
            try {
                if (isAuth) {
                    return user
                }
                return new GraphQLError("You must be the authenticated user to get this information", {
                    extensions: {
                        code: "USER_NOT_EXIST",
                        http: { status: 403 }
                    }
                })
            } catch (error) {
                // logger.error("User file | Query type | get current User function | lines between [ 40 - 50 ]")
                throw new GraphQLError(error)
            }
        },
        refreshToken: async (parent, args, {refreshToken, req, isAuth}, info) => {
            try {
                const origin = req.header('Origin');

                let role = origin == "https://dashboard.atlaeq.com" ? ["worker", "admin"] : ["client"]

                if (!refreshToken || refreshToken === "") {
                    return new GraphQLError( "Refresh token does not exist", {
                        extensions: {
                            code: "USER_NOT_EXIST",
                            http: { status: 403 }
                        }
                    });
                }

                let decodedToken = await VerifyToken(refreshToken);
                // If decoded token is null then set authentication of the request false
                if (!decodedToken) {
                    return new GraphQLError("Refresh token invalid or expired", {
                        extensions: {
                            code: "USER_NOT_EXIST",
                            http: { status: 403 }
                        }
                    });
                }

                if (!sameUserAgent(decodedToken.useragent, req.useragent)) {
                    return new GraphQLError("The user is not properly logged in", {
                        extensions: {
                            code: "USER_NOT_EXIST",
                            http: { status: 403 }
                        }
                    });
                }

                let isExist = await isExistUser(decodedToken.id);

                if (!isExist) {
                    return new GraphQLError("User Does not exist", {
                        extensions: {
                            code: "USER_NOT_EXIST",
                            http: { status: 403 }
                        }
                    });
                }

                let token = null
                if (isExist && "id" in isExist) {
                    token = AuthToken({id:  isExist.id }, 5);
                    
                    if (isExist && "role" in isExist && role.includes(isExist.role)) {
                        return {
                            token
                        }
                    } else {
                        return new GraphQLError("User Does not exist", {
                            extensions: {
                                code: "USER_NOT_EXIST",
                                http: { status: 403 }
                            }
                        });
                    }
                }
            } catch (error) {
                return new GraphQLError(error)
            }
        },
    },

    User: {
        permissionGroup: async ({idPermissionGroup}, {}, contextValue, info) =>  {
            try {
                return await PermissionGroup.findById(idPermissionGroup)
            } catch (error) {
                throw new GraphQLError(error)
            }
        },
    },

    Mutation: {
        createUser: async (parent, {content}, contextValue, info) =>  {
            try {
                let alreadyExist = await alreadyExistUser(content.email, content.phone);

                if (alreadyExist !== false) {
                    return new GraphQLError(alreadyExist.message, {
                        extensions: {
                            code: alreadyExist.code,
                            http: { status: 403 }
                        }

                    })
                }

                let token = generator({chars: '0-9'}).generate(6)
                let password = await hashPassword(content.password);

                let user = await User.create({
                    ...content,
                    password,
                    activation: true,
                    emailVerify: false,
                    codeVerify: token
                })

                await verificationMail ({to: content.email, token: token});

                return user
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updateUser: async (parent, {id, content}, contextValue, info) =>  {
            try {
                let {ok, value} = await User.findByIdAndUpdate(id, content, {includeResultMetadata: true, new: true});

                return {
                    data: value,
                    status: ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        deleteUser: async (parent, {id}, contextValue, info) =>  {
            try {
                // @ts-ignore
                const {modifiedCount} = await User?.deleteById(id)

                return {
                    status: modifiedCount >= 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        updateMyPassword: async (parent, {id, content}, contextValue, info) =>  {
            try {
                const {password, oldPassword} = content

                let user = await isExistUser(id);

                if (!user) {
                    return new GraphQLError("User Does not exist");
                }

                let isMatch = null;
                if ("password" in user) {
                    isMatch = await comparePassword(oldPassword, user?.password);
                }

                let result = null;
                if (isMatch) {
                    let newPassword = await hashPassword(password);

                    result = await User.findByIdAndUpdate(id, {password: newPassword}, {includeResultMetadata: true, new: true});
                } else {
                    return new GraphQLError("password is incorrect")
                }

                return {
                    status: result?.ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        checkVerificationUser: async (parent, {email, code}, contextValue, info) => {
            try {
                if (!code || code === "") {
                    return  new GraphQLError("Code invalid");
                }

                let user = await User.findOne({email});

                if (!user) {
                    return new GraphQLError("User Does not exist");
                }

                if (user.codeVerify !== code) {
                    return new GraphQLError("Code verify is invalid.");
                }

                let {ok, value} = await User.findByIdAndUpdate(user._id, {emailVerify: true, codeVerify: null}, {includeResultMetadata: true, new: true});

                return {
                    status: ok === 1,
                    data: value
                }

            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        resendVerificationEmail: async (parent, {email}, contextValue, info) => {
            try {
                let user =  await User.findOne({ email });

                if (!user) { 
                    return new GraphQLError('User not found', {
                        extensions: {
                            code: 'USER_NOT_EXIST',
                            http: { status: 403 }
                        }
                    });
                }
                let token = generator({chars: '0-9'}).generate(6)

                let {ok} = await User.findByIdAndUpdate(user._id, {codeVerify: token}, {includeResultMetadata: true, new: true});

                if (ok === 1) {
                    await verificationMail({ to: user.email, token });
                    return {
                        status: true
                    }
                }

                return {
                    status: false
                }
            }  catch (error) {
                throw new GraphQLError(error)
            }
        },

        forgetPassword: async (parent, {email}, contextValue, info) => {
            try {
                let user =  await User.findOne({ email });

                if (!user) {
                    return new GraphQLError('User not found', {
                        extensions: {
                            code: 'USER_NOT_EXIST',
                            http: { status: 403 }
                        },
                    });
                }

                let token = generator({chars: '0-9'}).generate(6)

                let {ok} = await User.findByIdAndUpdate(user._id, {otpPassword: token, requiredChangePassword: true}, {includeResultMetadata: true, new: true});

                if (ok === 1) {
                    await forgetPasswordMail ({to: email, token: token});
                    return {
                        status: true
                    }
                }

                return {
                    status: false
                }
            }  catch (error) {
                throw new GraphQLError(error)
            }
        },

        checkOTPPassword: async (parent, {email, code}, contextValue, info) => {
            try {
                if (!code || code === "") {
                    return  new GraphQLError("Code invalid");
                }

                let user = await User.findOne({email});

                if (!user) {
                    return new GraphQLError("User Does not exist");
                }

                if (user.otpPassword !== code) {
                    return {
                        status: false
                    }
                }

                return {
                    status: true
                }

            }  catch (error) {
                throw new GraphQLError(error)
            }
        },

        changePassword: async (parent, {content}, contextValue, info) => {
            try {
                const {email, code, password} = content;


                if (!code || code === "") {
                    return  new GraphQLError("Code invalid");
                }

                let user = await User.findOne({email});

                if (!user) {
                    return new GraphQLError("User Does not exist");
                }

                if (user.otpPassword !== code) {
                    return new GraphQLError("Code verify is invalid.");
                }

                // Hash the user password
                let hash = await hashPassword(password);
                let {ok} = await User.findByIdAndUpdate(user._id, {password: hash, otpPassword: null, requiredChangePassword: false, emailVerify: true}, {includeResultMetadata: true, new: true});

                return {
                    status: ok === 1
                }

            }  catch (error) {
                throw new GraphQLError(error)
            }
        },

        activeUser: async (parent, {id, activation}, contextValue, info) => {
            try {
                let {ok, value} = await User.findByIdAndUpdate(id, {activation}, {includeResultMetadata: true, new: true});

                return {
                    status: ok === 1
                }
            } catch (error) {
                throw new GraphQLError(error)
            }
        },

        logOut: async (parent, {}, contextValue, info) => {
            try {
                let cookie = contextValue.res.cookie('__store', '', {
                    domain: DOMAIN,
                    maxAge: 0, // Hours * 24 * 7
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                });


                return {
                    status: true,
                };
            } catch (error) {
                throw new GraphQLError(error);
            }
        },

    }
}
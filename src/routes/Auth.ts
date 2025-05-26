import {Router} from "express";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {User} from "../models/index.js";
import {hashPassword} from "../helpers/index.js";

import RandToken from 'rand-token';
const { uid, generator } = RandToken

const ClientID = "408783142730-ndd8eujcvprm1hecb23v51uat6nrn66j.apps.googleusercontent.com";
const ClientSecret = "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";
const REDIRECT_URI = 'https://api.sendibad.shop/api/auth/google/callback';

passport.use(
    new GoogleStrategy(
        {clientID: ClientID, clientSecret: ClientSecret, callbackURL: REDIRECT_URI,},
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("GoogleStrategy VerifyCallback");
                console.log({profile});

                const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
                if (!email) {
                    return done(new Error('No email found in Google profile'), null);
                }

                const findUser = await User.findById(profile.id)
                if (!findUser) {
                    let password = await hashPassword("QDGFSQG12FSQ132SFgsdfd");
                    let token = generator({chars: '0-9'}).generate(4)
                    let user = await User.create({
                        name: profile.displayName,
                        email,
                        phone: '',
                        password: '123sdgQ',
                        role: 'owner',
                        activation: true,
                        emailVerify: true,
                        codeVerify: token,
                    })

                    return done(null, user);
                }
                return done(null, findUser);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

export const router = Router();

router.get('/google/login', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get("/google/callback", passport.authenticate('google', {failureRedirect: "https://admin.sendibad.shop/?status:failure", successRedirect: "https://admin.sendibad.shop/?status:success", session: false, authInfo: true}))
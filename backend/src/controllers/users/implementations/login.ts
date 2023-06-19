import { Response } from "express";
import { InferSchemaType } from "mongoose";

import UserModel from "@models/User";
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function login_impl(req, res: Response, administrator: boolean) {
    let username = req.body['username'];
    let password = req.body['password'];

    UserModel.findOne({ username: username, password: password }).then(
        (user: User) => {
            if (!user) {
                res.statusCode = 400;
                res.send(['Pogrešni kredencijali.']);
                return;
            }
    
            if (!user.approved) {
                res.statusCode = 403;
                res.send(['Administrator još uvek nije odobrio pristup.']);
                return;
            }
            else if(user.banned) {
                res.statusCode = 403;
                res.send(['Pristup sajtu je zabranjen za navedeni nalog.']);
                return;
            }
    
            // Administrator se prijavljuje preko posebnog zahteva.
            if (!administrator && user.type === USER_TYPES.admin) {
                res.statusCode = 401;
                res.send(['Pogrešni kredencijali.']);
                return;
            }
    
            req.session[SESSION_DATA.user_id] = user._id;
            req.session[SESSION_DATA.user_type] = user.type;
    
            res.send({ 'user_id': user._id, 'user_type': user.type });
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

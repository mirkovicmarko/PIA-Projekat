import { Response } from "express";
import { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get_all(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if (user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    UserModel.find({ type: { $ne: USER_TYPES.admin } }).then(
        (users: User[]) => {
            for(let user of users) {
                user.password = undefined;
                user.verification = undefined;
            }

            res.send(users);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
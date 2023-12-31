import { Response } from "express";
import { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get_info(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const requested_user_id = req.body['id'];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(requested_user_id !== undefined && user_type != USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    const id = requested_user_id !== undefined ? requested_user_id : user_id;

    UserModel.findOne({ _id: id }).then(
        (user: User) => {
            user.password = undefined;
            user.verification = undefined;

            res.send(user);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
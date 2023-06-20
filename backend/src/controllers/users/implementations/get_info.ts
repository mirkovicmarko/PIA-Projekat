import { Response } from "express";
import { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get_info(req, res: Response) {
    let user_id = req.session[SESSION_DATA.user_id];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    UserModel.findOne({ _id: user_id }).then(
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
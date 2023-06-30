import { Response } from "express";
import { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get_all(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    UserModel.findOne({ _id: user_id, type: USER_TYPES.agency }).then(
        (user: User) => {
            res.send(user.agency.workers);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
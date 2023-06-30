import { Response } from "express";
import mongoose, { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const id = req.query['id'];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    UserModel.findOne({ _id: user_id, "agency.workers._id": id }).then(
        (user: User) => {
            if(!user) {
                res.statusCode = 400;
                res.send(['Zadati radnik ne postoji.']);
                return;
            }

            res.send(user.agency.workers.find((worker) => worker._id.equals(id)));
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
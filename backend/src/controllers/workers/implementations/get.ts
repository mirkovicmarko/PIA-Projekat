import { Response } from "express";
import mongoose, { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const id = req.query['id'];
    const requested_agency_id = req.query['agency_id'];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(requested_agency_id !== undefined && user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    const agency_id = requested_agency_id !== undefined ? requested_agency_id : user_id;

    UserModel.findOne({ _id: agency_id, "agency.workers._id": id }).then(
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
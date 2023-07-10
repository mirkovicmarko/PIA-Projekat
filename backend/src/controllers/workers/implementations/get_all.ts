import { Response } from "express";
import mongoose, { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import WorkerModel from '@models/User/Agency/Worker';
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;
type Worker = InferSchemaType<typeof WorkerModel.schema>;

export default function get_all(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const allocated_string = req.query['allocated'];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if (allocated_string !== undefined && !['true', 'false'].includes(allocated_string)) {
        res.statusCode = 401;
        res.send();
        return;
    }

    UserModel.findOne({ _id: user_id, type: USER_TYPES.agency }).then(
        (user: User) => {
            const workers: Worker[] = user.agency.workers;

            if(allocated_string !== undefined) {
                const allocated = JSON.parse(allocated_string);
                res.send(workers.filter(worker => worker.allocated === allocated));
            }
            else res.send(workers);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
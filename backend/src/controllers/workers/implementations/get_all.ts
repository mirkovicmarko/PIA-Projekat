import { Response } from "express";
import mongoose, { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import WorkerModel from '@models/User/Agency/Worker';
import { SESSION_DATA, USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;
type Worker = InferSchemaType<typeof WorkerModel.schema>;

export default function get_all(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const allocated_string = req.query['allocated'];
    const requested_agency_id = req.query['agency_id'];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if (allocated_string !== undefined && !['true', 'false'].includes(allocated_string)) {
        res.statusCode = 400;
        res.send();
        return;
    }

    if(requested_agency_id !== undefined && user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    const id = requested_agency_id !== undefined ? requested_agency_id : user_id;

    UserModel.findOne({ _id: id, type: USER_TYPES.agency }).then(
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
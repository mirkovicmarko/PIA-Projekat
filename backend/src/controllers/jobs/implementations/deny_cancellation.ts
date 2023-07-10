import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { JOB_STATUSES, CONSTRUCTION_STATUSES, SESSION_DATA, USER_TYPES } from '@consts';
import { InferSchemaType } from 'mongoose';
import WorkerModel from '@models/User/Agency/Worker';
import UserModel from '@models/User';


type Worker = InferSchemaType<typeof WorkerModel.schema>;
type User = InferSchemaType<typeof UserModel.schema>;

export default async function deny_cancellation(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const job_id = req.body['job_id'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!job_id) {
        res.statusCode = 400;
        res.send(['Unesite sve podatke.']);
        return;
    }

    if(user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    const object = await ObjectModel.findOne(
        { 'jobs._id': job_id }
    ).then(
        (object) => {
            if(!object) {
                res.statusCode = 400;
                res.send(['Zadati objekat ne postoji.']);
                return null;
            }

            return object;
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
            return null;
        }
    );

    if(!object) {
        return;
    }

    const job = object.jobs.find(job => job._id.equals(job_id));
    job.cancellation = null;

    try {
        object.save();
    }
    catch(error) {
        console.log(error);

        res.statusCode = 500;
        res.send(['Greška na serveru.']);
        return;
    }

    res.send();
};
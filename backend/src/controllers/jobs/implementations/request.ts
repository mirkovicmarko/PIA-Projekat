import { Response } from "express";

import ObjectModel from '@models/Object';
import JobModel from '@models/Object/Job';
import { JOB_STATUSES, CONSTRUCTION_STATUSES, SESSION_DATA, JOB_STATUSES_GROUPED } from "@consts";


export default async function request(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const object_id = req.body['object_id'];
    const agency_id = req.body['agency_id'];
    const start_date = req.body['start_date'];
    const end_date = req.body['end_date'];

    if (!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if (!object_id || !agency_id || !start_date || !end_date) {
        res.statusCode = 400;
        res.send(['Niste uneli sve neophodne podatke.']);
        return;
    }

    const object = await ObjectModel.findOne({ _id: object_id }).then(
        (object) => {
            if(!object) {
                res.statusCode = 400;
                res.send(['Zadati objekat ne postoji.']);
                return null;
            }

            if(!object.owner.equals(user_id)) {
                res.statusCode = 403;
                res.send(['Zadati objekat ne pripada Vama.']);
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

    if (object === null) {
        return;
    }

    const active_job = object.jobs.find((job) => JOB_STATUSES_GROUPED.awaiting.includes(job.status) || JOB_STATUSES_GROUPED.undergoing.includes(job.status));
    if(active_job) {
        res.statusCode = 400;
        switch(active_job.status) {
            case JOB_STATUSES.requested:
            case JOB_STATUSES.offered:
                res.send(['Zadati objekat je već u procesu ugovaranja.']);
                break;
            case JOB_STATUSES.awaiting:
            case JOB_STATUSES.undergoing:
                res.send(['Zadati objekat je već u procesu uređivanja.']);
                break;
        }
        return;
    }

    const new_job = new JobModel({
        start_date: start_date,
        end_date: end_date,
        agency_id: agency_id
    });

    const validation_errors = new_job.validateSync();
    if(validation_errors) {
        res.statusCode = 400;
        res.send(['Unesite sve obavezne podatke ispravno.']);
        return;
    }

    object.jobs.push(new_job);
    object.status = CONSTRUCTION_STATUSES.awaiting;

    object.save().then(
        () => {
            res.send();
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );

};
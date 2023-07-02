import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { JOB_STATUSES, CONSTRUCTION_STATUSES, SESSION_DATA } from '@consts';


export default function decline(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const id = req.body['id'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!id) {
        res.statusCode = 400;
        res.send('Unesite sve podatke.');
        return;
    }

    ObjectModel.findOneAndUpdate(
        { 'jobs._id': id, 'jobs.agency_id': user_id },
        { 'jobs.$[elem].status': JOB_STATUSES.declined, status: CONSTRUCTION_STATUSES.done },
        { arrayFilters: [ { 'elem._id': id } ] }
    ).then(
        (updated_object) => {
            if(!updated_object) {
                res.statusCode = 400;
                res.send(['Zadati objekat ne postoji.']);
                return;
            }

            res.send();
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
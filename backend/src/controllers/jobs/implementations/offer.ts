import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { JOB_STATUSES, SESSION_DATA } from '@consts';


export default function offer(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const id = req.body['id'];
    const amount = req.body['amount'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!id || !amount) {
        res.statusCode = 400;
        res.send('Unesite sve podatke.');
        return;
    }

    let amount_number;
    try {
        amount_number = parseInt(amount);
    }
    catch(error) {
        res.statusCode = 400;
        res.send('Niste uneli ispravno iznos.');
        return;
    }

    ObjectModel.findOneAndUpdate(
        { 'jobs._id': id, 'jobs.agency_id': user_id },
        { 'jobs.$[elem].price': amount, 'jobs.$[elem].status': JOB_STATUSES.offered },
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

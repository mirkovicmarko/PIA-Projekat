import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { CONSTRUCTION_STATUSES, JOB_STATUSES, SESSION_DATA } from '@consts';
import agency_aggregation from './get/agency_aggregation';


export default async function allocate_workers(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const job_id = req.body['id'];
    const workers_distribution = req.body['workers_distribution'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!job_id) {
        res.statusCode = 400;
        res.send('Unesite sve podatke.');
        return;
    }

    const get_job_pipeline = agency_aggregation(user_id, job_id);

    const job = ObjectModel.aggregate(get_job_pipeline).then(
        (result) => {
            if(result.length === 0) {
                res.statusCode = 400;
                res.send('Posao ne postoji.');
                return null;
            }
            return result[0];
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
            return null;
        }
    );
    
    if(job === null) {
        return;
    }



    /*
    ObjectModel.findOne(
        { 'jobs._id': id, owner: user_id },
        {
            'jobs.$[elem].status': JOB_STATUSES,
            status: CONSTRUCTION_STATUSES.undergoing,
            'rooms.$[].reconstruction_status': CONSTRUCTION_STATUSES.awaiting
        },
        { 
            arrayFilters: [
                { 'elem._id': id }
            ]
        }
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
    */
};

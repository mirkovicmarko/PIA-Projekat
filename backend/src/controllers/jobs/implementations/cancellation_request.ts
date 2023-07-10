import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { JOB_STATUSES, CONSTRUCTION_STATUSES, SESSION_DATA } from '@consts';
import { InferSchemaType } from 'mongoose';
import { Resolver } from 'dns';


export default async  function cancellation_request(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const id = req.body['id'];
    const message = req.body['message'];

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

    const object = await ObjectModel.findOne(
        { 'jobs._id': id, owner: user_id }
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

    const job = object.jobs.find(job => job._id.equals(id));

    if(job.cancellation) {
        res.statusCode = 400;
        res.send(['Već ste zahtevali otkazivanje.']);
        return;
    }

    job.cancellation = {
        message: message
    };

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
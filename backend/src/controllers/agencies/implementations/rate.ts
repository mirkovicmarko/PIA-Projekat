import { Request, Response } from 'express';

import UserModel from '@models/User';
import ObjectModel from '@models/Object';
import { CONSTRUCTION_STATUSES, JOB_STATUSES, SESSION_DATA } from '@consts';


export default async function rate(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const agency_id = req.body['agency_id'];
    const title = req.body['title'];
    const text = req.body['text'];
    const rating = req.body['rating'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!agency_id || !title || !rating || !text) {
        res.statusCode = 400;
        res.send('Unesite sve podatke.');
        return;
    }

    const agency_user = await UserModel.findOne({ _id: agency_id }).then(
        (user) => {
            if(!user) {
                res.statusCode = 400;
                res.send(['Zadata agencija ne postoji.']);
                return null;
            }

            return user;
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);

            return null;
        }
    );

    if(agency_user === null) {
        return;
    }

    const object = await ObjectModel.findOne({ owner: user_id, 'jobs.agency_id': agency_id, 'jobs.status': JOB_STATUSES.paid }).then(
        (object) => {
            if(!object) {
                res.statusCode = 400;
                res.send(['Ne možete da komentarišete dok ne završite barem jedan posao sa agencijom.']);
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

    if(object === null) {
        return;
    }

    const old_comment = agency_user.agency.comments.find(comment => comment.author.equals(user_id));

    if(old_comment) {
        old_comment.title = title;
        old_comment.text = text;
        old_comment.rating = rating;
    }
    else {
        agency_user.agency.comments.push({
            title: title,
            text: text,
            rating: rating,
            author: user_id
        });
    }

    try {
        agency_user.save();
        res.send();
    }
    catch(error) {
        console.log(error);

        res.statusCode = 500;
        res.send(['Greška na serveru.']);
    }
};

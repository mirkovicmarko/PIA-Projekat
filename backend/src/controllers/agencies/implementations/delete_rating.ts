import { Request, Response } from 'express';

import UserModel from '@models/User';
import ObjectModel from '@models/Object';
import { CONSTRUCTION_STATUSES, JOB_STATUSES, SESSION_DATA } from '@consts';


export default async function delete_rating(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    const agency_id = req.body['agency_id'];

    if(!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(!agency_id) {
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

    const comment_index = agency_user.agency.comments.findIndex(comment => comment.author.equals(user_id));

    if(comment_index == -1) {
        res.statusCode = 400;
        res.send(['Niste ocenili agenciju.']);
        return;
    }

    agency_user.agency.comments.splice(comment_index, 1);

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

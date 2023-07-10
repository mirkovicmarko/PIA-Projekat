import { Response } from 'express';

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from '@consts';

export default function allow_more_workers(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const agency_id = req.body['agency_id'];

    if (user_id === undefined) {
        res.statusCode = 205;
        res.send();
        return;
    }

    if(agency_id === undefined) {
        res.statusCode = 400;
        res.send();
        return;
    }

    if(user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    UserModel.findOne(
        { _id: agency_id, type: USER_TYPES.agency }
    ).then(
        (user) => {
            if(!user) {
                res.statusCode = 400;
                res.send(['Zadata radionica ne postoji.']);
                return;
            }

            if(user.agency.requested_workers === 0) {
                res.statusCode = 400;
                res.send(['Agencija nije zahtevala više radnih mesta.']);
                return;
            } 

            user.agency.allowed_workers += user.agency.requested_workers;
            user.agency.requested_workers = 0;

            user.save().then(
                () => {
                    res.send();
                },
                (error) => {
                    console.log(error);
                    res.statusCode = 500;
                    res.send(['Greška na serveru.']);
                }
            );
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

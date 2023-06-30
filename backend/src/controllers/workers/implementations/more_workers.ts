import { Response } from 'express';

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from '@consts';

export default function more_workers(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const number = req.body['number'];

    if (user_id === undefined) {
        res.statusCode = 205;
        res.send();
        return;
    }

    UserModel.findOne(
        { _id: user_id, type: USER_TYPES.agency }
    ).then(
        (user) => {
            if(!user) {
                res.statusCode = 400;
                res.send(['Zadata radionica ne postoji.']);
                return;
            }

            if(user.agency.requested_workers) {
                res.statusCode = 400;
                res.send(['Ne možete zahtevati još radnika pre nego što Vam se prethodni zahtev ne odobri/odbije.']);
                return;
            } 

            user.agency.requested_workers = number;
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

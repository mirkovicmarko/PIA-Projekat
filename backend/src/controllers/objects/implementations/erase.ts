import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { SESSION_DATA } from '@consts';


export default function erase(req, res: Response) {
    const id = req.body['id'];
    const user_id = req.session[SESSION_DATA.user_id];

    if(user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    ObjectModel.findOneAndDelete({ _id: id, owner: user_id }).then(
        (deleted_object) => {
            if(!deleted_object) {
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

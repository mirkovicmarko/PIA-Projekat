import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { SESSION_DATA } from '@consts';


export default function change(req, res: Response) {
    const object = req.body['object'];
    const user_id = req.session[SESSION_DATA.user_id];

    if(user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(object === undefined) {
        res.statusCode = 400;
        res.send();
        return;
    }

    const update_object = new ObjectModel(object);

    update_object.owner = user_id;

    const fields_validation = update_object.validateSync();
    if(fields_validation) {
        res.statusCode = 400;
        res.send(['Unesite ispravno sve obavezne podatke.']);
        return;
    }

    ObjectModel.findOneAndUpdate({ _id: update_object._id, owner: user_id }, update_object).then(
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
    )
};

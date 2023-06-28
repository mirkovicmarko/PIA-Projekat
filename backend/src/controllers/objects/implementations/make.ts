import { Request, Response } from 'express';

import ObjectModel from '@models/Object';
import { SESSION_DATA } from '@consts';


export default function make(req, res: Response) {
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

    const new_object = new ObjectModel(object);
    
    new_object.owner = user_id;

    const fields_validation = new_object.validateSync();
    if(fields_validation) {
        res.statusCode = 400;
        res.send(['Unesite ispravno sve obavezne podatke.']);
        return;
    }
    
    new_object.save().then(
        (_new_object) => res.send(),
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

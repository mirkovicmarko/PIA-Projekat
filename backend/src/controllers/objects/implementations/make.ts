import { Request, Response } from 'express';

import ObjectModel from '@models/Object';


export default function make(req: Request, res: Response) {
    const object = req.body['object'];

    if(object === undefined) {
        res.statusCode = 400;
        res.send();
        return;
    }

    const new_object = new ObjectModel(object);

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

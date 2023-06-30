import { Request, Response } from 'express';

import UserModel from '@models/User';
import WorkerModel from '@models/User/Agency/Worker';
import { SESSION_DATA, USER_TYPES } from '@consts';


export default function edit(req, res: Response) {
    const worker = req.body['worker'];
    const user_id = req.session[SESSION_DATA.user_id];

    if(user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    if(worker === undefined) {
        res.statusCode = 400;
        res.send();
        return;
    }

    const update_worker = new WorkerModel(worker);

    const fields_validation = update_worker.validateSync();
    if(fields_validation) {
        res.statusCode = 400;
        res.send(['Unesite ispravno sve obavezne podatke.']);
        return;
    }

    UserModel.findOneAndUpdate({ _id: user_id, type: USER_TYPES.agency, "agency.workers._id": update_worker._id }, { "agency.workers.$": update_worker }).then(
        (updated_worker) => {
            if(!updated_worker) {
                res.statusCode = 400;
                res.send(['Zadati radnik ne postoji.']);
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

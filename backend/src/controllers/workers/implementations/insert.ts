import { Request, Response } from 'express';

import UserModel from '@models/User';
import WorkerModel from '@models/User/Agency/Worker';
import { SESSION_DATA, USER_TYPES } from '@consts';


export default async function insert(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const worker = req.body['worker'];
    const requested_agency_id = req.body['agency_id'];

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

    if(requested_agency_id !== undefined && user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    const id = requested_agency_id !== undefined ? requested_agency_id : user_id;

    const new_worker = new WorkerModel(worker);

    const fields_validation = new_worker.validateSync();
    if(fields_validation) {
        res.statusCode = 400;
        res.send(['Unesite ispravno sve obavezne podatke.']);
        return;
    }

    const user = await UserModel.findOne({ _id: id, type: USER_TYPES.agency }).then(
        (user) => {
            return user;
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            return null;
        }
    );

    if(res.statusCode === 500) {
        res.send(['Greška na serveru.']);
        return;
    }
    else if(!user) {
        res.statusCode = 400;
        res.send(['Agencija ne postoji.']);
        return;
    }

    if(user_type !== USER_TYPES.admin && user.agency.allowed_workers === user.agency.workers.length) {
        res.statusCode = 403;
        if(!user.agency.requested_workers) {
            res.send(['Morate poslati zahtev za još radnika.']);
        } else {
            res.send(['Morate sačekati da Vam administrator odobri još radnik mesta.']);
        }
        return;
    }

    user.agency.workers.push(new_worker);
    if(user_type === USER_TYPES.admin) {
        user.agency.allowed_workers++;
    }

    user.save().then(
        (_) => {
            res.send()
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

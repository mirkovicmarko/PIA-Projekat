import { Request, Response } from 'express';

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from '@consts';


export default function erase(req, res: Response) {
    const id = req.body['id'];
    const user_id = req.session[SESSION_DATA.user_id];

    if(user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    UserModel.findOne({ _id: user_id, type: USER_TYPES.agency }).then(
        (user) => {
            if(!user) {
                res.statusCode = 400;
                res.send(['Zadata radionica ne postoji.']);
                return;
            }

            const worker_index = user.agency.workers.findIndex((worker) => worker._id.equals(id));
            if(worker_index === -1) {
                res.statusCode = 400;
                res.send(['Zadati radnik ne postoji.']);
                return;
            }

            user.agency.workers.splice(worker_index, 1);
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

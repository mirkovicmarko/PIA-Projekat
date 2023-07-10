import { Response } from 'express';

import info_change_validation from "../validations/info_change";
import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from '@consts';

export default function allow(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const requested_user_id = req.body['id'];

    if (user_id === undefined) {
        res.statusCode = 400;
        res.send();
        return;
    }

    if (user_type !== USER_TYPES.admin) {
        res.statusCode = 403;
        res.send();
        return;
    }

    UserModel.findOneAndUpdate({ _id: requested_user_id }, { approved: true }).then(
        (old_user) => {
            if(!old_user) {
                res.statusCode = 400;
                res.send(['Korisnik ne postoji.']);
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

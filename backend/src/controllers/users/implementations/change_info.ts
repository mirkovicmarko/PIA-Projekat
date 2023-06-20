import { Response } from 'express';

import info_change_validation from "../validations/info_change";
import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from '@consts';

export default function change_info(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    if (user_id === undefined) {
        res.statusCode = 205;
        res.send();
        return;
    }

    const user = new UserModel(req.body['user']);

    // Remove any fields not associated with the user type.
    for(let type of Object.keys(USER_TYPES)) {
        if(type != user_type) user[type] = undefined;
    }

    // Fields that cannot be edited.
    user._id = user_id;
    user.username = undefined;
    user.password = undefined;
    user.type = undefined;
    user.approved = undefined;
    user.banned = undefined;
    user.verification = undefined;
    
    const validation_errors = info_change_validation(user);
    if (validation_errors) {
        res.statusCode = 400;
        res.send(validation_errors);
        return;
    }

    UserModel.findOneAndUpdate({ _id: user_id }, user).then(
        (_old_user) => {
            res.send();
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

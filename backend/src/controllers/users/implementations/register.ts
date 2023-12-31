import { Request, Response } from 'express';
import { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import registration_validation from '@controllers/users/validations/registration';
import { SESSION_DATA, USER_TYPES } from '@consts';
import default_profile_picture_base64 from '@assets/default_profile_picture_base64';

type User = InferSchemaType<typeof UserModel.schema>;


export default function register(req, res: Response) {
    const user_type = req.session[SESSION_DATA.user_type];

    const user = req.body['user'];

    if(user === undefined) {
        res.statusCode = 400;
        res.send();
        return;
    }

    const new_user = new UserModel(user);

    const required_fields_validation = new_user.validateSync();
    if(required_fields_validation) {
        res.statusCode = 400;
        res.send(['Unesite sve obavezne podatke.']);
        return;
    }

    const validation_errors = registration_validation(new_user);
    if(validation_errors) {
        res.statusCode = 400;
        res.send(validation_errors);
        return;
    }

    if(new_user.type != USER_TYPES.client && new_user.type != USER_TYPES.agency) {
        res.statusCode = 400;
        res.send();
        return;
    }

    // Remove any fields not associated with the user type.
    for(let type of Object.keys(USER_TYPES)) {
        if(type != new_user.type) new_user[type] = undefined;
    }

    new_user.banned = false;
    new_user.approved = user_type === USER_TYPES.admin;

    if(!new_user.profile_picture) {
        new_user.profile_picture = default_profile_picture_base64;
    }

    if(new_user.type === USER_TYPES.agency) {
        new_user.agency.requested_workers = undefined;
    }
    
    UserModel.find({
        $or: [
            { username: new_user.username },
            { email: new_user.email }
        ]
    }).then(
        (users: User[]) => {
            if (users.length == 0) {
                new_user.save().then(
                    (_new_user) => res.send(),
                    (error) => {
                        console.log(error);

                        res.statusCode = 500;
                        res.send(['Greška na serveru.']);
                    }
                );
                return;
            }
    
            const errors: string[] = [];
            for(let user of users) {
                if (user.username.localeCompare(new_user.username) == 0) {
                    errors.push('Korisničko ime je već u upotrebi.');
                }
                if (user.email.localeCompare(new_user.email) == 0) {
                    errors.push('I-mejl je već u upotrebi.');
                }
            }

            res.statusCode = 400;
            res.send(errors);
        },
        (error) => {
            console.log(error);

            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

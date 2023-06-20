import { Response } from "express";

import UserModel from '@models/User';
import * as validation from "../validations/utils";
import { SESSION_DATA } from "@consts";

export default function change_password(req, res: Response) {
    let user_id = req.session[SESSION_DATA.user_id];
    let old_password = req.body['old_password'];
    let new_password = req.body['new_password'];

    if(new_password === undefined || old_password == undefined || user_id === undefined) {
        res.statusCode = 400;
        res.send(['Unesite neophodne podatke.']);
        return;
    }

    UserModel.findOne({ _id: user_id }).then(
        (user) => {
            if (user == null) {
                res.statusCode = 500;
                res.send(['Greška na serveru.']);
                return;
            }
            
            if(old_password.localeCompare(user.password) != 0) {
                res.statusCode = 401;
                res.send(['Stara lozinka je pogrešna.']);
                return;
            }

            if(!validation.password(new_password)) {
                res.statusCode = 400;
                res.send(['Lozinka mora biti dužine od 7 do 12 i da sadrži minimum: 1 malo slovo, 1 veliko slovo, 1 specijalni karakter i 1 broj.']);
                return;
            }

            user.password = new_password;
            user.save();
            res.send();
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

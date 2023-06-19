import { Response } from "express";

import UserModel from '@models/User';
import * as validation from "../validations/utils";

export default function change_forgotten_password(req, res: Response) {
    let verification_code = req.body['verification_code'];
    let new_password = req.body['new_password'];

    if(verification_code === undefined || new_password === undefined) {
        res.statusCode = 400;
        res.send(['Unesite neophodne podatke.']);
        return;
    }

    UserModel.findOne({ "verification.code" : verification_code }).then(
        (user) => {
            if (user == null) {
                res.statusCode = 401;
                res.send(['Pogrešan verifikacioni kod.']);
                return;
            }

            if (new Date().getTime() - parseInt(user.verification.time) > 10 * 60 * 1000) {
                res.statusCode = 400;
                res.send(['Isteklo je vreme za promenu lozinke (10 minuta).']);
                return;
            }

            if(!validation.password(new_password)) {
                res.statusCode = 400;
                res.send(['Lozinka mora biti dužine od 7 do 12 i da sadrži minimum: 1 malo slovo, 1 veliko slovo, 1 specijalni karakter i 1 broj.']);
                return;
            }

            user.verification = null;
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

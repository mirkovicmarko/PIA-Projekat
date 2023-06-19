import { Response } from "express";
import crypto from "crypto";
import nodemailer from "nodemailer"

import UserModel from '@models/User';
import { ORIGIN_URL } from "@consts";

export default function forgotten_password(req, res: Response) {
    const email = req.body['email'];

    if (email === undefined) {
        res.statusCode = 400;
        res.send();
    }

    UserModel.findOne({ email: email }).then(
        (user) => {
            if (user == null) {
                res.send();
                return;
            }
            
            user.verification = {
                code: crypto.randomBytes(20).toString('hex'),
                time: new Date().getTime().toString()
            };
    
            nodemailer.createTestAccount().then(
                (account) => {
                    const transporter = nodemailer.createTransport({
                        host: account.smtp.host,
                        port: account.smtp.port,
                        secure: account.smtp.secure,
                        auth: {
                            user: account.user,
                            pass: account.pass
                        },
                    });
    
                    transporter.sendMail({
                        from: '"PIA Projekat" <pia@projekat.rs>',
                        to: email,
                        subject: 'Promena lozinke',
                        html: '<a href="' + ORIGIN_URL + '/account/change_password?verification_code=' + user.verification.code + '">Promenite lozinku</a>'
                    }).then(
                        (response) => console.log(nodemailer.getTestMessageUrl(response)),
                        (error) => {
                            console.log(error);
                        }
                    );
                    
                    user.save();
                    res.send();
                },
                (error) => {
                    if (error) {
                        res.statusCode = 500;
                        res.send(['Greška na serveru.']);
                        return;
                    }
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

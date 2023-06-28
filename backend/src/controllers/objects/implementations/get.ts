import { Response } from "express";
import mongoose, { InferSchemaType } from "mongoose";

import ObjectModel from '@models/Object';
import { SESSION_DATA } from "@consts";

type Object = InferSchemaType<typeof ObjectModel.schema>;

export default function get(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const id = req.query['id'];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    ObjectModel.findOne({ _id: id }).then(
        (object: Object) => {
            if(!object) {
                res.statusCode = 400;
                res.send(['Zadati objekat ne postoji.']);
                return;
            }

            if(!object.owner.equals(user_id)) {
                res.statusCode = 403;
                res.send(['Zadati objekat ne pripada Vama.']);
                return;
            }

            res.send(object);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
import { Response } from "express";
import { InferSchemaType } from "mongoose";

import ObjectModel from '@models/Object';
import { SESSION_DATA } from "@consts";

type Object = InferSchemaType<typeof ObjectModel.schema>;

export default function get_all(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];

    if (user_id === undefined) {
        res.statusCode = 401;
        res.send();
        return;
    }

    ObjectModel.find({ owner: user_id }).then(
        (object: Object[]) => {
            res.send(object);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
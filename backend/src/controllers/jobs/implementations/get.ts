import { Response } from "express";

import ObjectModel from '@models/Object';
import { SESSION_DATA, USER_TYPES } from "@consts";
import agency_aggregation from "./get/agency_aggregation";
import client_aggregation from "./get/client_aggregation";
import admin_aggregation from "./get/admin_aggregation";


export default function get(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    const job_id = req.query['id'];

    if (!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    let aggregation;

    switch(user_type) {
        case USER_TYPES.agency:
            aggregation = agency_aggregation(user_id, job_id);
            break;
        case USER_TYPES.client:
            aggregation = client_aggregation(user_id, job_id);
            break;
        case USER_TYPES.admin:
            aggregation = admin_aggregation();
            break;
        default:
            res.statusCode = 400;
            res.send();
            return;
    }

    ObjectModel.aggregate(aggregation).exec().then(
        (result) => {
            if(job_id) {
                result = result[0];
            }
            res.send(result);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

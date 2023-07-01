import { Response } from "express";
import mongoose, { InferSchemaType } from "mongoose";

import ObjectModel from '@models/Object';
import { SESSION_DATA, USER_TYPES } from "@consts";


export default function get_all(req, res: Response) {
    const user_id = req.session[SESSION_DATA.user_id];
    const user_type = req.session[SESSION_DATA.user_type];

    if (!user_id) {
        res.statusCode = 401;
        res.send();
        return;
    }

    let aggregation;

    switch(user_type) {
        case USER_TYPES.agency:
            aggregation = agency_aggregation(user_id);
            break;
        case USER_TYPES.client:
            aggregation = client_aggregation(user_id);
            break;
        default:
            res.statusCode = 400;
            res.send();
            return;
    }

    ObjectModel.aggregate(aggregation).exec().then(
        (result) => {
            res.send(result);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};

function agency_aggregation(user_id: string) {
    return [
        {
            $match: {
                'jobs.agency_id': new mongoose.Types.ObjectId(user_id)
            }
        },
        {
            $unwind: '$jobs'
        },
        {
            $set: {
              'jobs.object': '$$ROOT'
            }
        },
        {
            $replaceRoot: {
                newRoot: '$jobs'
            }
        },
        {
            $lookup: {
                from: "Users",
                localField: "object.owner",
                foreignField: "_id",
                as: "client_info"
            }
        },
        {
            $unwind: '$client_info'
        },
        {
            $set: {
                'object.jobs': '$$REMOVE',
                'agency_id': '$$REMOVE',
                'client_info.client.email': '$client_info.email',
                'client_info.client.phone_number': '$client_info.phone_number'
            }
        },
        {
            $set: {
                'client_info': '$client_info.client'
            }
        },
        {
            $set: {
                'client_info.client': '$$REMOVE'
            }
        }
    ];
}

function client_aggregation(user_id: string) {
    return [
        {
            $match: {
                'owner': new mongoose.Types.ObjectId(user_id)
            }
        },
        {
            $unwind: '$jobs'
        },
        {
            $set: {
              'jobs.object': '$$ROOT'
            }
        },
        {
            $replaceRoot: {
                newRoot: '$jobs'
            }
        },
        {
            $lookup: {
                from: "Users",
                localField: "agency_id",
                foreignField: "_id",
                as: "agency_info"
            }
        },
        {
            $unwind: '$agency_info'
        },
        {
            $set: {
                'object.jobs': '$$REMOVE',
                'agency_id': '$$REMOVE',
                'agency_info.agency.email': '$agency_info.email',
                'agency_info.agency.phone_number': '$agency_info.phone_number'
            }
        },
        {
            $set: {
                'agency_info': '$agency_info.agency'
            }
        },
        {
            $set: {
                'agency_info.agency': '$$REMOVE'
            }
        }
    ];
}

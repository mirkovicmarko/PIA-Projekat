import { Response } from "express";
import { InferSchemaType } from "mongoose";

import UserModel from '@models/User';
import { USER_TYPES } from "@consts";

type User = InferSchemaType<typeof UserModel.schema>;

export default function get_all(req, res: Response) {
    UserModel.aggregate([
        {
            $match: {
                type: USER_TYPES.agency,
                banned: false,
                approved: true
            }
        },
        {
            $project: {
                _id: "$_id",
                profile_picture: "$profile_picture",
                name: "$agency.name",
                id: "$agency.id",
                address: "$agency.address",
                description: "$agency.description"
            }
        }
    ]).exec().then(
        (agencies) => {
            res.send(agencies);
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
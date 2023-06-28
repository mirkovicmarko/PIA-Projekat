import { Response } from "express";
import mongoose from "mongoose";

import UserModel from '@models/User';
import { SESSION_DATA, USER_TYPES } from "@consts";
import default_profile_picture_base64 from "@assets/default_profile_picture_base64";


export default function get(req, res: Response) {
    const agency_id = req.query['id'];
    const user_id = req.session[SESSION_DATA.user_id];

    UserModel.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(agency_id),
                type: USER_TYPES.agency,
                banned: false,
                approved: true
            }
        },
        {
            $unwind: {
                path: "$agency.comments",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "Users",
                localField: "agency.comments.author",
                foreignField: "_id",
                as: "agency.comments.author_info"
            }
        },
        {
            $unwind: {
                path: "$agency.comments.author_info",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $set: {
                "agency.comments": { $cond: { if: { $eq: ["$agency.comments", {}] }, then: "$$REMOVE", else: "$agency.comments" } }
            }
        },
        {
            $group: {
                _id: "$_id",
                profile_picture: { $first: "$profile_picture" },
                name: { $first: "$agency.name" },
                id: { $first: "$agency.id" },
                address: { $first: "$agency.address" },
                description: { $first: "$agency.description" },
                comments: { $push: "$agency.comments" }
            }
        },
        {
            $project: {
                "comments.author_info.password": 0,
                "comments.author_info.verification": 0
            }
        }
    ]).exec().then(
        (agencies) => {
            if(agencies.length == 1) {
                const agency = agencies[0];

                if(user_id === undefined) {
                    for(let comment of agency['comments']) {
                        comment['author_info'] = {
                            profile_picture: default_profile_picture_base64,
                            first_name: '',
                            last_name: '',
                            username: ''
                        };
                    }
                } 
                
                res.send(agency);
            }
            else {
                res.statusCode = 400;
                res.send();
            }
        },
        (error) => {
            console.log(error);
            res.statusCode = 500;
            res.send(['Greška na serveru.']);
        }
    );
};
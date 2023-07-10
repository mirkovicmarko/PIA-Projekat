import mongoose from "mongoose";


export default function admin_aggregation() {
    return [
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
            $lookup: {
                from: "Users",
                localField: "agency_id",
                foreignField: "_id",
                as: "agency_info"
            }
        },
        {
            $unwind: '$client_info'
        },
        {
            $unwind: '$agency_info'
        },
        {
            $set: {
                'object.jobs': '$$REMOVE',

                'agency_id': '$$REMOVE',
                'client_info.client.email': '$client_info.email',
                'client_info.client.phone_number': '$client_info.phone_number',

                'agency_info.agency._id': '$agency_id',
                'agency_info.agency.email': '$agency_info.email',
                'agency_info.agency.phone_number': '$agency_info.phone_number'
            }
        },
        {
            $set: {
                'client_info': '$client_info.client',

                'agency_info': '$agency_info.agency',
                'agency_id': '$$REMOVE'
            }
        },
        {
            $set: {
                'client_info.client': '$$REMOVE',

                'agency_info.agency': '$$REMOVE'
            }
        }
    ];
}

import mongoose from "mongoose";


export default function agency_aggregation(user_id: string, job_id: string = undefined) {
    const job_match = {};

    if(job_id) {
        job_match['jobs._id'] = new mongoose.Types.ObjectId(job_id);
    }

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
            $match: job_match
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

import mongoose from "mongoose";


export default function client_aggregation(user_id: string, job_id: string = undefined) {
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

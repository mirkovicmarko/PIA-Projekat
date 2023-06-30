import mongoose from "mongoose";

import CommentModel from "./Agency/Comment";
import WorkerModel from "./Agency/Worker";


const AgencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    comments: {
        type: [CommentModel.schema],
        default: []
    },
    workers: {
        type: [WorkerModel.schema],
        default: []
    },
    allowed_workers: {
        type: Number,
        default: 0
    },
    requested_workers: {
        type: Number,
        required: false,
        min: 1
    }
}, { _id: false });

export default mongoose.model('userAgencyModel', AgencySchema);

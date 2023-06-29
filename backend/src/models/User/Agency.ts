import mongoose from "mongoose";

import CommentSchema from "./Agency/Comment";
import WorkerSchema from "./Agency/Worker";


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
        type: [CommentSchema],
        default: []
    },
    workers: {
        type: [WorkerSchema],
        default: []
    },
    allowed_workers: {
        type: Number,
        default: 0
    }
}, { _id: false });

export default AgencySchema;

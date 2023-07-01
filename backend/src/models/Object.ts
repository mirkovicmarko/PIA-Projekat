import mongoose from "mongoose";

import { MAX_ROOMS, MIN_ROOMS, OBJECT_TYPES } from "@consts";
import RoomModel from "./Object/Room";
import Job from "./Object/Job";


const ObjectSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(OBJECT_TYPES)
    },
    address: {
        type: String,
        required: true
    },
    rooms: {
        type: [RoomModel.schema],
        required: true,
        validate: (rooms) => {
            return rooms.length >= MIN_ROOMS && rooms.length <= MAX_ROOMS;
        }
    },
    quadrature: {
        type: Number,
        required: true,
        min: 1
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobs: {
        type: [Job.schema],
        default: []
    }
});


export default mongoose.model('objectModel', ObjectSchema, 'Objects');

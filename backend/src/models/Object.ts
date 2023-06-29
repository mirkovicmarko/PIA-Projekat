import mongoose from "mongoose";

import { MAX_ROOMS, MIN_ROOMS, OBJECT_TYPES } from "@consts";
import RoomSchema from "./Object/Room";


const ObjectModel = new mongoose.Schema({
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
        type: [RoomSchema],
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
});


export default mongoose.model('objectModel', ObjectModel, 'Objects');

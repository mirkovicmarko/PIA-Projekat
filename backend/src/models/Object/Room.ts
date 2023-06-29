import mongoose from "mongoose";
import PositionSchema from "./Room/Position";
import DoorSchema from "./Room/Door";


const RoomSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    position: {
        type: PositionSchema,
        required: true
    },
    doors: {
        type: [DoorSchema],
        default: []
    }
});

export default RoomSchema;

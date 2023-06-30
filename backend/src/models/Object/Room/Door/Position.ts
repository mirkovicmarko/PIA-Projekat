import mongoose from "mongoose";


const PositionSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
        min: 0
    },
    y: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

export default mongoose.model('objectRoomDoorPositionModel', PositionSchema);

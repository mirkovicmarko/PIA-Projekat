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
    },
    width: {
        type: Number,
        required: true,
        min: 1
    },
    height: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

export default mongoose.model('objectRoomPositionModel', PositionSchema);

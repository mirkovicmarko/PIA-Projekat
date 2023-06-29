import mongoose from "mongoose";


const WorkerSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    }
});

export default WorkerSchema;
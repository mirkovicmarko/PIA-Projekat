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
    email: {
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
}, { autoCreate: false, autoIndex: false });

export default mongoose.model('userAgencyWorkerModel', WorkerSchema);
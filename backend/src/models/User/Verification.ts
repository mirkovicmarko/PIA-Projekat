import mongoose from "mongoose";


const VerificationSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, { _id: false, autoCreate: false, autoIndex: false });

export default mongoose.model('userVerificationModel', VerificationSchema);
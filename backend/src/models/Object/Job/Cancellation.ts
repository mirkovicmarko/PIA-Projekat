import mongoose from "mongoose";


const CancellationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    }
}, { _id: false ,autoCreate: false, autoIndex: false });

export default mongoose.model('objectJobCancellationModel', CancellationSchema);

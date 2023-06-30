import mongoose from "mongoose";

import { USER_TYPES } from "@consts";
import ClientModel from "./User/Client";
import AgencyModel from "./User/Agency";
import VerificationModel from "./User/Verification";


const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    banned: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        required: true,
        enum: Object.keys(USER_TYPES)
    },
    profile_picture: {
        type: String,
        default: null
    },

    client: {
        type: ClientModel.schema,
        default: null
    },
    agency: {
        type: AgencyModel.schema,
        default: null
    },
    verification: {
        type: VerificationModel.schema,
        default: null
    }
});

export default mongoose.model('userModel', UserSchema, 'Users');

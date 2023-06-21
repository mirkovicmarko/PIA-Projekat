import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
    _id: {
        type: ObjectId,
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
        required: true
    },
    profile_picture: {
        type: String,
        default: null
    },

    client: {
        _id: false,
        type: {
            first_name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            }
        },
        default: null,
        required: false
    },

    agency: {
        _id: false,
        type: {
            name: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            comments: {
                type: Array<{
                    author: {
                        type: String,
                        required: true
                    },
                    text: {
                        type: String,
                        required: true
                    },
                    title: {
                        type: String,
                        required: true
                    },
                    rating: {
                        type: Number,
                        required: true,
                        min: 0,
                        max: 5
                    }
                }>,
                default: []
            }
        },
        default: null,
        required: false
    },

    verification: {
        _id: false,
        type: {
            code: {
                type: String,
                default: null
            },
            time: {
                type: String,
                default: null
            }
        },
        default: null,
        required: false
    }
});

export default mongoose.model('userModel', UserModel, 'Users');

import { USER_TYPES } from "@consts";
import mongoose from "mongoose";


const UserModel = new mongoose.Schema({
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
                        type: mongoose.Schema.Types.ObjectId,
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
            },
            workers: {
                type: Array<{
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
                }>,
                default: []
            },
            allowed_workers: {
                type: Number,
                default: 0
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

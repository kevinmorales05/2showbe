import mongoose from "mongoose";
const { Schema } = mongoose;
const EventSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    artistID: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    bannerImg: {
        type: String,
        required: true,
    },
    videoImg: {
        type: String,
    },
    typeEventID: {
        type: String,
        required: true,
    },
    attendFrom: {
        type: String,
    },
    attendTo: {
        type: String,
    },
    status: {
        type: String,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
    addressEventID: {
        type: String,
        required: true
    },
    costingID: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: "EC",
    },
    city: {
        type: String,
        default: "UIO",
    },
    hourEvent: {
        type: String
    },
    urlEvent: {
        type: String,
    },
    ticketsAvailable: {
        type: Number,
    },
    online: {
        type: Boolean,
        default: false
    }
});
export const Event = mongoose.model("Event", EventSchema);

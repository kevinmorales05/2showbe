import mongoose from "mongoose";
const { Schema } = mongoose;
const EventCostSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    eventID: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    ticketsAvailable: {
        type: Number,
    }
});
export const EventCost = mongoose.model("EventCost", EventCostSchema);

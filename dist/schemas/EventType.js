import mongoose from "mongoose";
const { Schema } = mongoose;
const EventTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    icon: {
        type: String
    },
    urlImage: {
        type: String
    },
});
export const EventType = mongoose.model("EventType", EventTypeSchema);

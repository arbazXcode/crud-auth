import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "Title length must be atleast of 3 characters"]
    },
    description: {
        type: String,
        required: true,
        minLength: [3, "Description length must be atleast of 3 characters"]
    }
}, { timestamps: true })

const notesModel = new mongoose.model("notesModel", noteSchema)

export default notesModel
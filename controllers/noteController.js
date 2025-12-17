import notesModel from "../models/notes.models.js"
import mongoose from "mongoose"
import CustomError from "../utils/customError.js"


const createNotes = async (req, res, next) => {
    try {
        const { title, description } = req.body

        //check kro title and description aaya hai ya nhii
        if (!title || !description) {
            return next(new CustomError(400, "Invalid title and description"))
        }

        //if client ne send kia h to db me save kro.
        const newNotes = new notesModel({
            title,
            description
        })
        await newNotes.save()

        //agar successfully created ho gya hai to success message bhej do.
        return res.status(201).send({
            success: true,
            message: "Notes created successfully.",
            notes: newNotes
        })
    } catch (error) {
        next(error)
    }
}

const getAllNotes = async (req, res, next) => {

    try {
        const notes = await notesModel.find({})
        res.status(200).json({
            success: true,
            message: "Notes found",
            notes: notes
        })
    } catch (err) {
        next(err)
    }

}

const getNotesById = async (req, res, next) => {
    try {
        const { id } = req.params;
        //validate kro mongodb id 

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new CustomError(400, "Invalid id"))
        }

        const notes = await notesModel.findById(id)

        if (!notes) {
            return next(new CustomError(404, "Notes not found"))
        }
        return res.status(200).json({
            success: true,
            notes
        })
    } catch (error) {
        next(error)
    }
}

const updateNotes = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { title, description } = req.body

        const updateData = {}
        if (title) updateData.title = title
        if (description) updateData.description = description

        if (Object.keys(updateData).length === 0) {
            return next(new CustomError(400, "Nothing to update..."))
        }

        //validate the id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new CustomError(400, "Invalid id"))
        }

        const result = await notesModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
        //new - returns updated one

        if (!result) {
            return next(new CustomError(404, "Failed to update"))
        }
        return res.status(200).json({
            success: true,
            message: "updated successfully..",
            note: result
        })
    } catch (error) {
        next(error)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const { id } = req.params

        //validate kro. bhai
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new CustomError(400, "Invalid id"))
        }
        const result = await notesModel.findByIdAndDelete(id)
        if (!result) {
            return next(new CustomError(404, "Notes not found"))
        }
        return res.status(200).json({
            success: true,
            message: "notes deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

export { createNotes, getAllNotes, getNotesById, updateNotes, deleteById }
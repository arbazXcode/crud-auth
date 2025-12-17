import notesModel from "../models/notes.models.js"
import mongoose from "mongoose"


const createNotes = async (req, res) => {
    try {
        const { title, description } = req.body

        //check kro title and description aaya hai ya nhii
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "invalid title or description"
            })
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
        return res.status(500).json({
            success: false,
            message: "Internal server error..."
        })
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await notesModel.find({})
        return res.status(200).json({
            success: true,
            message: "Notes found",
            notes: notes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error."
        })
    }
}

const getNotesById = async (req, res) => {
    try {
        console.log("1");
        const { id } = req.params;
        //validate kro mongodb id 
        console.log("2");
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "invalid id"
            })
        }
        console.log("3");

        const notes = await notesModel.findById(id)
        console.log("4");
        if (!notes) {
            return res.status(404).json({
                success: false,
                message: "notes not found"
            })
        }
        console.log("5");
        return res.status(200).json({
            success: true,
            notes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

const updateNotes = async (req, res) => {
    const { id } = req.params;

    //validate the id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status()
    }
}

export { createNotes, getAllNotes, getNotesById }
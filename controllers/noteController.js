import notesModel from "../models/notes.models.js"

const createNotes = async (req, res) => {
    try {
        const { title, description } = req.body
        console.log("1");
        //check kro title and description aaya hai ya nhii
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "invalid title or description"
            })
        }
        console.log("2");
        //if client ne send kia h to db me save kro.
        const newNotes = new notesModel({
            title,
            description
        })
        console.log("3");
        if (!newNotes) {
            return res.status(401).json({
                success: false,
                message: "Error while creating notes."
            })
        }
        await newNotes.save()
        console.log("4");
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
        if (!notes) {
            return res.status(401).json({
                success: false,
                message: "no notes found"
            })
        }
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

export { createNotes, getAllNotes }
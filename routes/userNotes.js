import express from "express"
const router = express.Router()
import { createNotes, getAllNotes, getNotesById, updateNotes, deleteById } from "../controllers/noteController.js";
router.get("/notes", getAllNotes);
router.get("/notes/:id", getNotesById);
router.post("/notes", createNotes);
router.put("/notes/:id", updateNotes);
router.delete("/notes/:id", deleteById);

export default router
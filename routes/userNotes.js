import express from "express"
const router = express.Router()
import { createNotes } from "../controllers/noteController.js";
// router.get("/notes", getAllNotes);
// router.get("notes/:id", getNotesById);
router.post("/notes", createNotes);
// router.patch("/notes/:id", updateNotes);
// router.delete("/delete/:id", deleteById);

export default router
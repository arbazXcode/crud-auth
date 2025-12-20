import express from "express"
import dotenv from "dotenv"
import userNotes from "./routes/userNotes.js"
import userRouter from "./routes/userRoutes.js"
import dbConnect from "./config/db.js"
dotenv.config()


const app = express()
const port = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", userRouter)
app.use("/api/v1", userNotes)

dbConnect()
app.listen(port, () => {
    console.log(`server is listening on port http://localhost:${port}`);
})
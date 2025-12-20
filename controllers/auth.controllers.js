import CustomError from "../utils/customError.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(new CustomError(400, "All fields are required."))
        }

        //check if user already exists or not?
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return next(new CustomError(409, "User already exists"));
        }

        //if user does not exist. register them
        //phle password ko hash kro.
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: newUser._id, email }, process.env.JWT_SECRET, { expiresIn: '7h' })

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            token: token
        })
    } catch (error) {
        next(error)
    }
}

export { registerUser }
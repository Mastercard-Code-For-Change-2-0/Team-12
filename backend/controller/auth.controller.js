import User from "../model/user.model";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/auth";
import { JsonWebTokenError } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;

        if (!name || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: "Email is already in use" });
        }

        if(await User.findOne({username})){
            return res.status(400).json({ message: "Username is already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully", token , user : {userID : newUser._id , username : newUser.username , email : newUser.email , name : newUser.name} });
        
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error Sign up wale me " });
    }
}

const login = async (req , res) => {
    const {username , password} = req.body;

    if(!username || !password){
        return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({username});

    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: "Login successful", token, user: { userID: user._id, username: user.username, email: user.email, name: user.name } });
}

export { signUp, login };
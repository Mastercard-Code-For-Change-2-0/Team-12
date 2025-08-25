import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import authMiddleware from "../middleware/auth.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
    try {
        const { name, username, email, password, confirmPassword ,isStudent , isCompany , isAdmin } = req.body;

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
            password: hashedPassword,
            isStudent,
            isCompany,
            isAdmin
        })

        await newUser.save();

        // const newUserData = new User({

        // })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: "User created successfully", token , user : {userID : newUser._id , username : newUser.username , email : newUser.email , name : newUser.name , isStudent : newUser.isStudent , isCompany : newUser.isCompany , isAdmin : newUser.isAdmin } });

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

    res.status(200).json({ message: "Login successful", token, user: { userID: user._id, username: user.username, email: user.email, name: user.name , isStudent: user.isStudent, isCompany: user.isCompany, isAdmin: user.isAdmin } });
}

const logout = async (req, res) => {
    try {
        // Invalidate the token (implementation depends on your auth strategy

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export { signUp, login, logout };

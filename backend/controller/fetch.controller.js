import User from "../model/user.model.js";
import UserData from "../model/userData.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res.status(404).json({ success: false, error: "No users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getAllUserData = async (req, res) => {
    const userData = await UserData.find(); // Fetch all user data

    if (!userData || userData.length === 0) {
        return res.status(404).json({ success: false, error: "No user data found" });
    }

    res.status(200).json({ success: true, userData });
}

export const getUserByCompany = async (req, res) => {
    const { companyName } = req.params;

    try {
        const users = await User.find({ "company.companyName": companyName });

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, error: "No users found for this company" });
        }

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("Error fetching users by company:", error);
        res.status(500).json({ success: false, error: "Server error" });
    }
};
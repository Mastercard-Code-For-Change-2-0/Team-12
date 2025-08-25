import UserData from "../model/userData.model.js";
import User from "../model/user.model.js";

const updateProfile = async (req, res) => {
  try {
    const { name, username, email, company, education, currentAddress, currentJob, residentAddress } = req.body;

    const user = await User.findOneAndUpdate(
      { username },
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedProfile = await UserData.findOneAndUpdate(
      { username },
      {
        name,
        username,
        email,
        company,
        education,
        currentAddress,
        currentJob,
        residentAddress,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Profile updated successfully", profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const profile = async (req, res) => {
  try {
    const { username } = req.query; 
    const userProfile = await User.findOne({ username });
    const userData = await UserData.findOne({ username });
    if (!userProfile) {
        console.log("User profile not found for username:", username);
      return res.status(404).json({ message: "User profile not found" });
    }
    res.status(200).json({ profile: userProfile, data: userData });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { updateProfile, profile };

import Feedback from "../model/feedback.model.js";

export const sendFeedback = async (req, res) => {
  try {
    const { companyName, username, companyToUser, rating , message} = req.body;


    if (!companyName || !username || typeof companyToUser !== "boolean" || !Array.isArray(rating)) {
      return res.status(400).json({ message: "All fields are required and rating must be an array" });
    }

    const feedback = new Feedback({
      companyName,
      username,
      companyToUser,
      rating,
      message
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Error sending feedback:", error);
    res.status(500).json({ message: "Server error", error });
  }
};




export const getFeedback = async (req, res) => {
  try {
    const { companyName, username } = req.query;

    let filter = {};
    if (companyName) filter.companyName = companyName;
    if (username) filter.username = username;

    const feedbacks = await Feedback.find(filter);

    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error("Error retrieving feedback:", error);
    res.status(500).json({ message: "Server error", error });
  }


};

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); // fetch all documents
    if (!feedbacks || feedbacks.length === 0) {
      return res.status(404).json({ success: false, message: "No feedbacks found" });
    }
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error("Error fetching all feedbacks:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
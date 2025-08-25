import mongoose from "mongoose";

export const educationSchema = new mongoose.Schema({
  Board: { type: String, required: true },
  School: { type: String, required: true },
  Degree: { type: String, required: true },
  FieldOfStudy: { type: String, required: true },
  StartedAt: { type: Date, required: true },
});

const Education = mongoose.model("Education", educationSchema);
export default Education;

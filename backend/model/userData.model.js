import mongoose from "mongoose";
import { companySchema } from "./company.model.js";
import { educationSchema } from "./education.model.js";

const userDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  company: [companySchema],   // embed schema
  education: [educationSchema], // embed schema
  currentAddress: { type: String },
  currentJob: { type: String },
  residentAddress: { type: String }
});

const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;

import mongoose from "mongoose";

export const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, required: true },
  startedAt: { type: Date, required: true },
  endedAt: { type: Date },
  location: { type: String, required: true }
});

const Company = mongoose.model("Company", companySchema);
export default Company;

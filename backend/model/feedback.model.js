import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  companyToUser: {
    type: Boolean,
    required: true
  },
  rating: {
    type: [Number],  // Array of numbers
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.every(num => typeof num === "number");
      },
      message: "All ratings must be numbers"
    },
    message : {
        type : String,
        required : true
    }
  }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;

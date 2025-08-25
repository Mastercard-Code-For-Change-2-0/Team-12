// hooks/useFeedback.js
import { useState } from "react";

const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]); // ensure it's an array
  const [loading, setLoading] = useState(false);

  const sendFeedback = async (feedbackData) => {
    try {
      const res = await fetch("http://localhost:5000/api/mastercard/feedback/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData)
      });
      const data = await res.json();
      console.log("Feedback sent:", data);
    } catch (err) {
      console.error("Send Feedback Error:", err);
    }
  };

  const getFeedbacks = async (username) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/mastercard/feedback/get?username=${username}`);
      const data = await res.json();
      console.log("Fetched feedbacks:", data);
      setFeedbacks(Array.isArray(data) ? data : []); // protect against non-array
    } catch (err) {
      console.error("Get Feedback Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { feedbacks, sendFeedback, getFeedbacks, loading };
};

export default useFeedback;

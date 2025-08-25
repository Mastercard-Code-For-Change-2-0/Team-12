import React, { useState, useEffect } from "react";
import useFeedback from "../hooks/useFeedback";

const Feedback = ({ username }) => {
  const { feedbacks, sendFeedback, getFeedbacks, loading } = useFeedback();

  const [companyName, setCompanyName] = useState("");
  const [ratings, setRatings] = useState([0]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (username) {
      getFeedbacks(username);
    }
  }, [username]);

  const handleRatingChange = (index, value) => {
    const updated = [...ratings];
    updated[index] = Number(value);
    setRatings(updated);
  };

  const addRatingField = () => {
    setRatings([...ratings, 0]);
  };

  const removeRatingField = (index) => {
    const updated = ratings.filter((_, i) => i !== index);
    setRatings(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!companyName || ratings.length === 0 || ratings.every(r => r === 0) || !message.trim()) return;

    const feedbackData = {
      companyName,
      username,
      companyToUser: true,
      rating: ratings.filter(r => r > 0),
      message
    };

    await sendFeedback(feedbackData);
    setCompanyName("");
    setRatings([0]);
    setMessage("");
    getFeedbacks(username);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc" }}>
      <h2>Feedbacks for {username}</h2>

      {/* Feedback form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "15px" }}>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          style={{ padding: "8px", marginRight: "10px", marginBottom: "10px" }}
        />

        <div style={{ marginBottom: "10px" }}>
          {ratings.map((r, index) => (
            <div key={index} style={{ marginBottom: "5px" }}>
              <select
                value={r}
                onChange={(e) => handleRatingChange(index, e.target.value)}
                style={{ padding: "6px", marginRight: "10px" }}
              >
                <option value={0}>Select Rating</option>
                <option value={1}>1 ⭐</option>
                <option value={2}>2 ⭐⭐</option>
                <option value={3}>3 ⭐⭐⭐</option>
                <option value={4}>4 ⭐⭐⭐⭐</option>
                <option value={5}>5 ⭐⭐⭐⭐⭐</option>
              </select>
              {ratings.length > 1 && (
                <button type="button" onClick={() => removeRatingField(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button type="button" onClick={addRatingField} style={{ marginRight: "10px" }}>
          + Add Rating
        </button>

        <br />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback message..."
          style={{ padding: "8px", width: "100%", margin: "10px 0" }}
        />

        <button type="submit">Send</button>
      </form>

      {/* Feedback list */}
      {loading ? (
        <p>Loading feedbacks...</p>
      ) : feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((fb, index) => (
            <li key={index}>
              <strong>{fb.username}</strong> rated {fb.companyName}:{" "}
              {fb.rating.join(", ")} — "{fb.message}"
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks yet.</p>
      )}
    </div>
  );
};

export default Feedback;

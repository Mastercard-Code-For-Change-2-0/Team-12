import React, { useState, useEffect } from "react";

const AllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mastercard/feedback/all");
        if (!res.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await res.json();
        setFeedbacks(data.feedbacks || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <p className="text-center text-gray-500 py-10">Loading feedbacks...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">All Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedbacks found.</p>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <div key={fb._id} className="border border-gray-200 bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p>
                  <span className="font-semibold text-gray-700">Company Name:</span> {fb.companyName}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Username:</span> {fb.username}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Direction:</span> {fb.companyToUser ? "Company to User" : "User to Company"}
                </p>
                <p>
                  <span className="font-semibold text-gray-700">Rating:</span> {fb.rating.join(", ")}
                </p>
              </div>
              {fb.message && (
                <p className="mt-3 pt-3 border-t border-gray-200 text-gray-600 text-sm">
                  <span className="font-semibold text-gray-700">Message:</span> {fb.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFeedbacks;
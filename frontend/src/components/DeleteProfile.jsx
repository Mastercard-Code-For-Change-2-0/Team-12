import React, { useState } from "react";

const DeleteProfile = () => {
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(false);
  // State to hold both message text and type (success/error)
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleDelete = async () => {
    if (!username) {
      setMessage({ text: "Username not found. Please log in again.", type: "error" });
      return;
    }
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch(`http://localhost:5000/api/mastercard/profile/delete?username=${username}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Profile deleted successfully.", type: "success" });
        localStorage.removeItem("username");
        // Optionally, redirect the user after deletion
        // window.location.href = '/';
      } else {
        setMessage({ text: data.message || "Failed to delete profile.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred. Please try again later.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Dynamic class for message styling
  const messageClass = message.type === "success" ? "text-green-700" : "text-red-700";

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md max-w-md mx-auto">
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-red-800">Delete Account</h3>
        <p className="text-sm text-red-700 mt-1">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            disabled={loading || !username}
            className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete My Profile"}
          </button>
        </div>
        {message.text && (
          <p className={`mt-3 text-sm font-medium ${messageClass}`}>{message.text}</p>
        )}
      </div>
    </div>
  );
};

export default DeleteProfile;
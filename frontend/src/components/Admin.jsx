import React, { useState } from "react";
import AllUsers from "./AllUser.jsx";       // Make sure this is your component
import AllUserData from "./AllUserData.jsx"; // The fixed component we just updated
import AllFeedbacks from "./AllFeedBack.jsx";
import AdminDashboard from "./AdminDashboard.jsx";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users"); // "users" or "userdata"

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Admin Dashboard</h1>

      {/* Tabs */}
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "users" ? "#007bff" : "#ccc",
            color: activeTab === "users" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All Users
        </button>

        <button
          onClick={() => setActiveTab("userdata")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: activeTab === "userdata" ? "#007bff" : "#ccc",
            color: activeTab === "userdata" ? "white" : "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          All User Data
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === "users" && <AllUsers />}
        {activeTab === "userdata" && <AllUserData />}
      </div>
      <AllFeedbacks />
      <AdminDashboard/>
    </div>
  );
};

export default AdminPage;

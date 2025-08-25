import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProfileView from "./components/ProfileView";
import ProfileUpdate from "./components/ProfileUpdate";
import Feedback from "./components/Feedback";
import AllUsers from "./components/AllUser";
import AllUserData from "./components/AllUserData";
import AdminPage from "./components/Admin";
import Company from "../../backend/model/company.model";
import CompanyUsers from "./components/CompanyUser.jsx";
import DeleteUser from "./components/DeleteProfile.jsx";
import AllFeedbacks from "./components/AllFeedBack.jsx";


const App = () => {
  // You can fetch username from localStorage here and pass to Feedback
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const username = parsedUser?.username || "";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/profileUpdate" element={<ProfileUpdate />} />
        <Route path="/deleteProfile" element={<DeleteUser />} />
        <Route path="/feedback" element={<Feedback username={username} />} />
      </Routes>
    </Router>
    // <AllFeedbacks/>
    // <DeleteUser />
    // <>
    // {/* <AdminPage/> */}
    // {/* <CompanyUsers /> */}
    // </>
    // <AdminPage/>
    // <Feedback username={username} />

  );
};

export default App;

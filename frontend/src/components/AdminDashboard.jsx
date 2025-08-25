import React, { useState, useEffect } from "react";
import AllUsers from "./AllUser.jsx";
import AllUserData from "./AllUserData.jsx";
import AllFeedbacks from "./AllFeedBack.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("metrics");
  const [userStats, setUserStats] = useState({ totalUsers: 0, totalCompanies: 0, totalStudents: 0 });
  const [feedbackStats, setFeedbackStats] = useState([]);
  const [userRoleDistribution, setUserRoleDistribution] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const resUsers = await fetch("http://localhost:5000/api/mastercard/fetch/user");
        const usersData = await resUsers.json();
        const resUserData = await fetch("http://localhost:5000/api/mastercard/fetch/userData");
        const userData = await resUserData.json();
        const resFeedback = await fetch("http://localhost:5000/api/mastercard/feedback/fetch");
        const feedbackData = await resFeedback.json();

        setUserStats({
          totalUsers: usersData.users?.length || 0,
          totalCompanies: userData.userData?.reduce((acc, u) => acc + (u.company?.length || 0), 0),
          totalStudents: usersData.users?.filter((u) => u.isStudent).length || 0,
        });

        const roleCounts = { admin: 0, student: 0, company: 0 };
        usersData.users?.forEach((u) => {
          if (u.isAdmin) roleCounts.admin += 1;
          if (u.isStudent) roleCounts.student += 1;
          if (u.isCompany) roleCounts.company += 1;
        });

        setUserRoleDistribution([
          { name: "Admin", value: roleCounts.admin },
          { name: "Student", value: roleCounts.student },
          { name: "Company", value: roleCounts.company },
        ]);

        setFeedbackStats(feedbackData.feedbacks || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMetrics();
  }, []);

  const tabs = [
    { label: "Metrics", key: "metrics" },
    { label: "All Users", key: "users" },
    { label: "All User Data", key: "userdata" },
    { label: "All Feedbacks", key: "feedbacks" },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const getTabClassName = (tabKey) => {
    const baseClasses = "py-2 px-4 text-sm font-medium text-center rounded-t-lg cursor-pointer transition-colors duration-300";
    if (activeTab === tabKey) {
      return `${baseClasses} text-blue-600 border-b-2 border-blue-600`;
    }
    return `${baseClasses} text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent`;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={getTabClassName(tab.key)}>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-4">
          {activeTab === "metrics" && (
            <>
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Total Users</h3>
                  <p className="text-4xl font-bold mt-2">{userStats.totalUsers}</p>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Total Companies</h3>
                  <p className="text-4xl font-bold mt-2">{userStats.totalCompanies}</p>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold">Total Students</h3>
                  <p className="text-4xl font-bold mt-2">{userStats.totalStudents}</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">User Role Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={userRoleDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {userRoleDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-gray-700">Feedback Count</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={feedbackStats}>
                      <XAxis dataKey="username" />
                      <YAxis />
                      <Tooltip wrapperClassName="!border !border-gray-300 !rounded-md !bg-white" />
                      <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab === "users" && <AllUsers />}
          {activeTab === "userdata" && <AllUserData />}
          {activeTab === "feedbacks" && <AllFeedbacks />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
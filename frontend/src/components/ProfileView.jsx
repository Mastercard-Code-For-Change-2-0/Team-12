import useProfile from "../hooks/useUpdateProfile";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const ProfileView = () => {
  const { fetchProfile, loading } = useProfile(); // Assuming hook provides a loading state
  const [profile, setProfile] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      const loadProfile = async () => {
        const data = await fetchProfile(username);
        setProfile(data);
      };
      loadProfile();
    }
  }, [username, fetchProfile]);

  if (loading || !profile) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  // Helper to format dates if they exist
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* --- Profile Header --- */}
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full flex-shrink-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-600">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-800">{profile.name}</h1>
                <p className="text-md text-gray-600">@{profile.username}</p>
                <p className="text-lg text-blue-600">{profile.currentJob}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-shrink-0 space-x-2">
              <NavLink to="/profileUpdate" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                Update Profile
              </NavLink>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* --- About Section --- */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">About</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
              <p><span className="font-semibold">Email:</span> {profile.email}</p>
              <p><span className="font-semibold">Current Address:</span> {profile.currentAddress}</p>
              <p><span className="font-semibold">Resident Address:</span> {profile.residentAddress}</p>
            </div>
          </div>

          {/* --- Work Experience Section --- */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Work Experience</h3>
            <div className="space-y-6">
              {profile.company?.length > 0 ? (
                profile.company.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h4 className="font-bold text-lg text-gray-800">{c.companyName}</h4>
                      <p className="text-gray-500 text-sm">{formatDate(c.startedAt)} - {formatDate(c.endedAt)}</p>
                    </div>
                    <p className="font-semibold text-blue-600">{c.role}</p>
                    <p className="text-gray-600 text-sm">{c.location}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No company data provided.</p>
              )}
            </div>
          </div>

          {/* --- Education Section --- */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Education</h3>
            <div className="space-y-6">
              {profile.education?.length > 0 ? (
                profile.education.map((e, i) => (
                  <div key={i}>
                    <div className="flex justify-between">
                      <h4 className="font-bold text-lg text-gray-800">{e.School}</h4>
                      <p className="text-gray-500 text-sm">{formatDate(e.StartedAt)}</p>
                    </div>
                    <p className="font-semibold text-blue-600">{e.Degree} in {e.FieldOfStudy}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No education data provided.</p>
              )}
            </div>
          </div>
          
          {/* --- Actions Section --- */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-3 sm:space-y-0">
             <NavLink to="/feedback" className="px-4 py-2 text-center text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                Give Feedback
              </NavLink>
              <NavLink to="/deleteProfile" className="px-4 py-2 text-center text-sm font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                Delete Profile
              </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
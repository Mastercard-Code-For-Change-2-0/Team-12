import React, { useEffect, useState } from "react";
import useProfile from "../hooks/useUpdateProfile";

const ProfileView = ({ username }) => {
  const { fetchProfile } = useProfile();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile(username);
      setProfile(data);
    };
    loadProfile();
  }, [username]);

  if (!profile) return <p className="text-gray-500">Loading profile...</p>;

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <p><span className="font-semibold">Name:</span> {profile.name}</p>
      <p><span className="font-semibold">Username:</span> {profile.username}</p>
      <p><span className="font-semibold">Email:</span> {profile.email}</p>
      <p><span className="font-semibold">Current Job:</span> {profile.currentJob}</p>
      <p><span className="font-semibold">Current Address:</span> {profile.currentAddress}</p>
      <p><span className="font-semibold">Resident Address:</span> {profile.residentAddress}</p>

      {/* Company */}
      <div className="mt-4">
        <h3 className="font-semibold">Company:</h3>
        {profile.company?.length > 0 ? (
          profile.company.map((c, i) => (
            <div key={i} className="ml-4">
              <p>{c.companyName} - {c.role} ({c.location})</p>
              <p>{c.address}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No company data</p>
        )}
      </div>

      {/* Education */}
      <div className="mt-4">
        <h3 className="font-semibold">Education:</h3>
        {profile.education?.length > 0 ? (
          profile.education.map((e, i) => (
            <div key={i} className="ml-4">
              <p>{e.Degree} in {e.FieldOfStudy}</p>
              <p>{e.School} ({e.Board})</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No education data</p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;

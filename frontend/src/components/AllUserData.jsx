import React, { useEffect, useState } from "react";

const AllUserData = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mastercard/fetch/userData");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUserData(data.userData || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) return <p className="text-center text-gray-500 py-10">Loading user data...</p>;
  if (error) return <p className="text-center text-red-500 py-10">Error: {error}</p>;
  if (!userData || userData.length === 0) return <p className="text-center text-gray-500 py-10">No user data found.</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">All User Data</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userData.map((user) => (
          <div key={user._id} className="border border-gray-200 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="mb-3">
              <h3 className="text-lg font-bold text-blue-600">{user.name}</h3>
              <p className="text-sm text-gray-500">@{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-gray-700">Current Job:</span> {user.currentJob || "N/A"}</p>
              <p><span className="font-semibold text-gray-700">Address:</span> {user.currentAddress || "N/A"}</p>
              <div>
                <h4 className="font-semibold text-gray-700 mt-2 border-t pt-2">Company</h4>
                {user.company && user.company.length > 0 ? (
                  user.company.map((c, i) => <p key={i} className="text-gray-600 ml-2">{`${c.companyName} (${c.role})`}</p>)
                ) : (
                  <p className="text-gray-600 ml-2">N/A</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mt-2 border-t pt-2">Education</h4>
                {user.education && user.education.length > 0 ? (
                  user.education.map((e, i) => <p key={i} className="text-gray-600 ml-2">{`${e.Degree} in ${e.FieldOfStudy}`}</p>)
                ) : (
                  <p className="text-gray-600 ml-2">N/A</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUserData;
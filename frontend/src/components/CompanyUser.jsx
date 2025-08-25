import React, { useState } from "react";

const CompanyUsers = () => {
  const [companyName, setCompanyName] = useState("");
  const [users, setUsers] = useState(null); // Use null to differentiate initial state from empty results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();
    if (!companyName) {
      setError("Please enter a company name.");
      return;
    }
    setLoading(true);
    setError("");
    setUsers(null);
    try {
      const res = await fetch(`http://localhost:5000/api/mastercard/users/company/${companyName}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch users");
      }
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Users by Company</h2>
      <form onSubmit={handleFetch} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="flex-grow block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {users && users.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Search Results</h3>
          <ul className="mt-2 space-y-3">
            {users.map((user) => {
              const companyInfo = user.company.find((c) => c.companyName.toLowerCase() === companyName.toLowerCase());
              return (
                <li key={user._id} className="p-3 bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center">
                  <span className="font-medium text-gray-800">{user.username}</span>
                  <span className="text-sm text-gray-600">Role: {companyInfo ? companyInfo.role : "N/A"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {users && users.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-6">No users found for this company.</p>
      )}
    </div>
  );
};

export default CompanyUsers;
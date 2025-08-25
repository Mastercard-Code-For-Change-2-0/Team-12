import React, { useState } from "react";
import useProfile from "../hooks/useUpdateProfile.js";

const ProfileUpdate = ({ existingProfile }) => {
  const { updateProfile } = useProfile();

  // Always ensure arrays exist
  const [formData, setFormData] = useState(() => ({
    name: existingProfile?.name || "",
    username: existingProfile?.username || "",
    email: existingProfile?.email || "",
    currentJob: existingProfile?.currentJob || "",
    currentAddress: existingProfile?.currentAddress || "",
    residentAddress: existingProfile?.residentAddress || "",
    company:
      Array.isArray(existingProfile?.company) && existingProfile.company.length > 0
        ? existingProfile.company
        : [
            {
              companyName: "",
              address: "",
              role: "",
              startedAt: "",
              endedAt: "",
              location: "",
            },
          ],
    education:
      Array.isArray(existingProfile?.education) && existingProfile.education.length > 0
        ? existingProfile.education
        : [
            {
              Board: "",
              School: "",
              Degree: "",
              FieldOfStudy: "",
              StartedAt: "",
            },
          ],
  }));

  // For simple fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // For nested arrays (company / education)
  const handleArrayChange = (e, index, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const addField = (type) => {
    const newItem =
      type === "company"
        ? { companyName: "", address: "", role: "", startedAt: "", endedAt: "", location: "" }
        : { Board: "", School: "", Degree: "", FieldOfStudy: "", StartedAt: "" };

    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  const removeField = (type, index) => {
    const updatedArray = [...formData[type]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData); // Debug
    await updateProfile(formData);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="currentJob"
            placeholder="Current Job"
            value={formData.currentJob}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="currentAddress"
            placeholder="Current Address"
            value={formData.currentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="residentAddress"
            placeholder="Resident Address"
            value={formData.residentAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold mb-2">Company Details</h3>
          {Array.isArray(formData.company) &&
            formData.company.map((c, index) => (
              <div key={index} className="space-y-2 border p-3 rounded mb-2">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={c.companyName}
                  onChange={(e) => handleArrayChange(e, index, "company")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={c.address}
                  onChange={(e) => handleArrayChange(e, index, "company")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={c.role}
                  onChange={(e) => handleArrayChange(e, index, "company")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={c.location}
                  onChange={(e) => handleArrayChange(e, index, "company")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  name="startedAt"
                  value={c.startedAt ? c.startedAt.substring(0, 10) : ""}
                  onChange={(e) => handleArrayChange(e, index, "company")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  name="endedAt"
                  value={c.endedAt ? c.endedAt.substring(0, 10) : ""}
                  onChange={(e) => handleArrayChange(e, index, "company")}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeField("company", index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove Company
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={() => addField("company")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Company
          </button>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="font-semibold mb-2">Education Details</h3>
          {Array.isArray(formData.education) &&
            formData.education.map((e, index) => (
              <div key={index} className="space-y-2 border p-3 rounded mb-2">
                <input
                  type="text"
                  name="Board"
                  placeholder="Board"
                  value={e.Board}
                  onChange={(e2) => handleArrayChange(e2, index, "education")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="School"
                  placeholder="School"
                  value={e.School}
                  onChange={(e2) => handleArrayChange(e2, index, "education")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="Degree"
                  placeholder="Degree"
                  value={e.Degree}
                  onChange={(e2) => handleArrayChange(e2, index, "education")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  name="FieldOfStudy"
                  placeholder="Field of Study"
                  value={e.FieldOfStudy}
                  onChange={(e2) => handleArrayChange(e2, index, "education")}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="date"
                  name="StartedAt"
                  value={e.StartedAt ? e.StartedAt.substring(0, 10) : ""}
                  onChange={(e2) => handleArrayChange(e2, index, "education")}
                  className="w-full border p-2 rounded"
                />
                <button
                  type="button"
                  onClick={() => removeField("education", index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove Education
                </button>
              </div>
            ))}
          <button
            type="button"
            onClick={() => addField("education")}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            + Add Education
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;

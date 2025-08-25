import React, { useState } from "react";
import useProfile from "../hooks/useUpdateProfile.js";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = ({ existingProfile }) => {
  // Assuming the hook provides a loading state for better UX
  const { updateProfile, loading } = useProfile(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => ({
    name: existingProfile?.name || "",
    username: existingProfile?.username || "",
    email: existingProfile?.email || "",
    currentJob: existingProfile?.currentJob || "",
    currentAddress: existingProfile?.currentAddress || "",
    residentAddress: existingProfile?.residentAddress || "",
    company: Array.isArray(existingProfile?.company) && existingProfile.company.length > 0 ? existingProfile.company : [],
    education: Array.isArray(existingProfile?.education) && existingProfile.education.length > 0 ? existingProfile.education : [],
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, index, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][e.target.name] = e.target.value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  const addField = (type) => {
    const newItem = type === "company"
        ? { companyName: "", address: "", role: "", startedAt: "", endedAt: "", location: "" }
        : { Board: "", School: "", Degree: "", FieldOfStudy: "", StartedAt: "" };
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  const removeField = (type, index) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    alert("Profile updated successfully!");
    navigate("/profile");
  };

  // Reusable classes for form inputs for consistency
  const inputClasses = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Basic Information Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={inputClasses} />
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={inputClasses} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className={inputClasses} />
              <input type="text" name="currentJob" placeholder="Current Job" value={formData.currentJob} onChange={handleChange} className={inputClasses} />
              <input type="text" name="currentAddress" placeholder="Current Address" value={formData.currentAddress} onChange={handleChange} className={`${inputClasses} sm:col-span-2`} />
              <input type="text" name="residentAddress" placeholder="Resident Address" value={formData.residentAddress} onChange={handleChange} className={`${inputClasses} sm:col-span-2`} />
            </div>
          </div>

          {/* Dynamic Sections (Company & Education) */}
          {['company', 'education'].map((type) => (
            <div key={type}>
              <h3 className="text-xl font-semibold text-gray-700 capitalize mb-4">{type} Details</h3>
              <div className="space-y-4">
                {formData[type].map((item, index) => (
                  <div key={index} className="bg-gray-50 border border-gray-200 p-4 rounded-lg space-y-4 relative">
                    <button
                      type="button"
                      onClick={() => removeField(type, index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
                      aria-label="Remove item"
                    >
                      &times;
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {type === 'company' ? (
                        <>
                          <input type="text" name="companyName" placeholder="Company Name" value={item.companyName} onChange={(e) => handleArrayChange(e, index, type)} className={inputClasses} />
                          <input type="text" name="role" placeholder="Role" value={item.role} onChange={(e) => handleArrayChange(e, index, type)} className={inputClasses} />
                          <input type="text" name="address" placeholder="Address" value={item.address} onChange={(e) => handleArrayChange(e, index, type)} className={inputClasses} />
                          <input type="text" name="location" placeholder="Location" value={item.location} onChange={(e) => handleArrayChange(e, index, type)} className={inputClasses} />
                          <div><label className="text-xs text-gray-500">Start Date</label><input type="date" name="startedAt" value={item.startedAt?.substring(0, 10) || ''} onChange={(e) => handleArrayChange(e, index, type)} className={inputClasses} /></div>
                          <div><label className="text-xs text-gray-500">End Date</label><input type="date" name="endedAt" value={item.endedAt?.substring(0, 10) || ''} onChange={(e) => handleArrayChange(e, index, type)} className={inputClasses} /></div>
                        </>
                      ) : (
                        <>
                          <input type="text" name="Degree" placeholder="Degree (e.g., Bachelor's)" value={item.Degree} onChange={(e) => handleArrayChange(e, index, "education")} className={inputClasses} />
                          <input type="text" name="FieldOfStudy" placeholder="Field of Study" value={item.FieldOfStudy} onChange={(e) => handleArrayChange(e, index, "education")} className={inputClasses} />
                          <input type="text" name="School" placeholder="School / University" value={item.School} onChange={(e) => handleArrayChange(e, index, "education")} className={`${inputClasses} sm:col-span-2`} />
                          <div><label className="text-xs text-gray-500">Start Date</label><input type="date" name="StartedAt" value={item.StartedAt?.substring(0, 10) || ''} onChange={(e) => handleArrayChange(e, index, "education")} className={inputClasses} /></div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addField(type)}
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-white font-semibold bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400"
          >
            {loading ? "Saving..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileUpdate;
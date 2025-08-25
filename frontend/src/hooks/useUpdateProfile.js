// hooks/useProfile.js
const useProfile = () => {
  const fetchProfile = async (username) => {
    try {
      const res = await fetch(`http://localhost:5000/api/mastercard/profile/fetch?username=${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("User profile fetched successfully:", data);
        // return both parts (user and userdata)
        return { ...data.profile, ...data.data };
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch("http://localhost:5000/api/mastercard/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Profile update successful:", data);
        return data.profile; // backend sends updated UserData
      } else {
        const err = await response.json();
        throw new Error(err.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return { fetchProfile, updateProfile };
};

export default useProfile;

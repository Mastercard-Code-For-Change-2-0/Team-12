import React, { useState } from 'react';
import useSignup from '../hooks/useSignup';
import { useNavigate, NavLink } from 'react-router-dom';

const SignUp = () => {
  // Assuming the hook provides loading/error states for a better UI
  const { signUp, loading, error } = useSignup();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signUp(
      name, username, email, password, confirmPassword,
      isStudent, isCompany, isAdmin
    );

    if (result && result.token) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("username", result.user.username);
      
      if (result.user.isStudent) {
        navigate("/profile");
      } else if (result.user.isCompany) {
        navigate("/company");
      } else if (result.user.isAdmin) {
        navigate("/admin");
      }
    }
  };
  
  // Reusable classes for form inputs
  const inputClasses = "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required className={inputClasses} />
          <input type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className={inputClasses} />
          <input type="email" name="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputClasses} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className={inputClasses} />

          {/* Role Selection */}
          <fieldset className="pt-2">
            <legend className="text-sm font-medium text-gray-700 text-center mb-2">Select Your Role</legend>
            <div className="flex justify-around">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={isStudent} onChange={() => setIsStudent(!isStudent)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-gray-700">Student</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={isCompany} onChange={() => setIsCompany(!isCompany)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-gray-700">Company</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-gray-700">Admin</span>
              </label>
            </div>
          </fieldset>
          
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          
          <p className="text-sm text-center text-gray-600 pt-4">
            Already have an account?{' '}
            <NavLink to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
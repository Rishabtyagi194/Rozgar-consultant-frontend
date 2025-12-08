"use client";

import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API instantly without delay
    console.log("Login Data:", formData);

    setLoading(false);

    // Redirect after login
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-[#1B4965]">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm mb-1 font-medium">Email</label>
            <div className="flex items-center border rounded-lg px-3">
              <FiMail className="text-gray-500" />
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full px-2 py-2 outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-1 font-medium">Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <FiLock className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                className="w-full px-2 py-2 outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#1B4965] text-white rounded-lg font-medium hover:bg-[#163A52] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

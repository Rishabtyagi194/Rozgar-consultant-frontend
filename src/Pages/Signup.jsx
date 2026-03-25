"use client";

import { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "consultant_admin",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: formData.role,
          }),
        }
      );

      const data = await res.json();
      console.log("Signup Response:", data);

      if (!res.ok) {
        setError(data?.message || "Signup failed!");
      } else {
        // ✅ Redirect to OTP page with email + role
        window.location.href = `/verify-otp?email=${formData.email}&role=${formData.role}`;
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full mt-2 border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 border px-4 py-2 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-2 border px-4 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full mt-2 border px-4 py-2 rounded-lg"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
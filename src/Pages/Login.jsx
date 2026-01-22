import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://147.93.72.227:5000/api/employer/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log("Login API response:", data);

      if (!res.ok) {
        alert(data?.message || "Login failed");
        return;
      }

      const token = data?.token;
      const employer = data?.employer;

      if (!token) {
        alert("Token not received from server");
        return;
      }

      // ✅ STORE IN LOCALSTORAGE (CORRECT KEYS)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(employer));

      alert("Login Successful!");

      // ✅ Redirect
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="block font-medium mb-1">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email or phone"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />

            <p className="text-right text-sm mt-1">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold disabled:bg-gray-400 hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}
        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register-agency")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

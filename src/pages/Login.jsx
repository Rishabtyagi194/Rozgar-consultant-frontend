import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/employer/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Login failed");
        return;
      }

      const token = data?.token;
      const employer = data?.employer;

      if (!token) {
        toast.error("Token not received from server");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(employer));

      toast.success("Login Successful!");
      navigate("/home");
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Toast only for Login */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden flex w-full max-w-5xl">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-xl font-bold text-[#0078db] mb-2">
              Rozgar Dwar
            </h2>
            <h3 className="text-2xl font-semibold mb-6">Login</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email or Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter email or phone"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078db]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter password"
                    className="w-full border rounded-lg px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078db]"
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-[#0078db] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-[#0078db] text-white py-2 rounded-lg transition flex items-center justify-center ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#005fa8]"
                }`}
              >
                {loading ? "Logging in..." : "Sign in"}
              </button>

              {/* Register */}
              <p className="text-sm text-center text-gray-600 mt-4">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register-agency")}
                  className="text-[#0078db] font-medium hover:underline"
                >
                  Register
                </button>
              </p>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg"
              alt="Login"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

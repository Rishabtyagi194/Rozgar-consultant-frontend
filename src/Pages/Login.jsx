import { useState } from "react";

const Login = ({ setAuthView }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        "http://147.93.72.227:5000/api/consultant/agency/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.emailOrPhone,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data?.message || "Login failed");
        return;
      }

      const token = data?.data?.token;
      const user = data?.data?.user;

      if (token) {
        document.cookie = `token=${token}; path=/; max-age=604800; SameSite=Lax`;
      }

      if (user) {
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(user)
        )}; path=/; max-age=604800; SameSite=Lax`;
      }

      alert("Login Successful!");

      // 🔥 React SPA success action (no reload)
      // You can lift auth state or redirect inside app layout
      window.location.reload(); // optional
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Email or Phone Number
            </label>
            <input
              type="text"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />

            <p className="text-right text-sm mt-1">
              <button
                type="button"
                onClick={() => setAuthView("forgot")}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => setAuthView("register-agency")}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterAgencyForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    organisationData: {
      name: "",
      industry: "",
      contact_email: "",
      contact_phone: "",
      address: "",
    },
    userData: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "consultant_admin",
    },
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= PASSWORD STRENGTH =================
  const checkPasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (
      password.match(/[A-Z]/) &&
      password.match(/[0-9]/) &&
      password.length >= 8
    ) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === "Weak") return "bg-red-500";
    if (passwordStrength === "Medium") return "bg-yellow-500";
    if (passwordStrength === "Strong") return "bg-green-500";
    return "bg-gray-200";
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e, section) => {
    const { name, value } = e.target;

    if (name === "password") {
      checkPasswordStrength(value);
    }

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://qa.api.rozgardwar.cloud/api/organization/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ Show success popup
      setShowSuccessPopup(true);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 mt-20 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">Register Agency</h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* ================= Organisation ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Organisation Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Agency Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.organisationData.name}
                  onChange={(e) => handleChange(e, "organisationData")}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.organisationData.industry}
                  onChange={(e) => handleChange(e, "organisationData")}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.organisationData.contact_email}
                  onChange={(e) => handleChange(e, "organisationData")}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  Contact Phone
                </label>

                <PhoneInput
                  country={"in"}
                  value={formData.organisationData.contact_phone}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      organisationData: {
                        ...prev.organisationData,
                        contact_phone: value,
                      },
                    }))
                  }
                  inputClass="!w-full !h-10"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.organisationData.address}
                  onChange={(e) => handleChange(e, "organisationData")}
                  className="w-full border p-2 rounded"
                  rows={3}
                  required
                />
              </div>

            </div>
          </div>

          {/* ================= User Section ================= */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              User Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-1 text-sm font-medium">
                  User Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.userData.name}
                  onChange={(e) => handleChange(e, "userData")}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  User Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.userData.email}
                  onChange={(e) => handleChange(e, "userData")}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>

              {/* Password */}
              <div className="md:col-span-2">
                <label className="block mb-1 text-sm font-medium">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.userData.password}
                    onChange={(e) => handleChange(e, "userData")}
                    className="w-full border p-2 rounded pr-10"
                    required
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                {formData.userData.password && (
                  <div className="mt-2">
                    <div className="h-2 rounded bg-gray-200">
                      <div
                        className={`h-2 rounded ${getStrengthColor()}`}
                        style={{
                          width:
                            passwordStrength === "Weak"
                              ? "33%"
                              : passwordStrength === "Medium"
                              ? "66%"
                              : "100%",
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1">
                      Strength: {passwordStrength}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">
                  User Phone
                </label>

                <PhoneInput
                  country={"in"}
                  value={formData.userData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      userData: {
                        ...prev.userData,
                        phone: value,
                      },
                    }))
                  }
                  inputClass="!w-full !h-10"
                />
              </div>

            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Register Agency"}
          </button>

        </form>
      </div>

      {/* ================= SUCCESS POPUP ================= */}
      {showSuccessPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-[90%] max-w-md text-center">

            <div className="text-green-600 text-5xl mb-4">✓</div>

            <h3 className="text-xl font-bold mb-2">
              Registration Successful!
            </h3>

            <p className="text-gray-600 mb-6">
              A verification email has been sent to your email address.
              <br />
              Please verify your account before logging in.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Back to Login
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default RegisterAgencyForm;
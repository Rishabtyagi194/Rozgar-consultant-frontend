import React, { useState } from "react";

const RegisterAgencyForm = () => {
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
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e, section) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://qa.api.rozgardwar.cloud/api/organization/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("✅ Agency registered successfully!");

      // reset form
      setFormData({
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
        },
      });
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-20 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register Agency</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ================= Organisation Section ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Organisation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Agency Name"
              value={formData.organisationData.name}
              onChange={(e) => handleChange(e, "organisationData")}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.organisationData.industry}
              onChange={(e) => handleChange(e, "organisationData")}
              className="border p-2 rounded"
              required
            />

            <input
              type="email"
              name="contact_email"
              placeholder="Contact Email"
              value={formData.organisationData.contact_email}
              onChange={(e) => handleChange(e, "organisationData")}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="contact_phone"
              placeholder="Contact Phone"
              value={formData.organisationData.contact_phone}
              onChange={(e) => handleChange(e, "organisationData")}
              className="border p-2 rounded"
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formData.organisationData.address}
              onChange={(e) => handleChange(e, "organisationData")}
              className="border p-2 rounded md:col-span-2"
              rows={3}
              required
            />
          </div>
        </div>

        {/* ================= User Section ================= */}
        <div>
          <h3 className="text-lg font-semibold mb-3">User Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="User Name"
              value={formData.userData.name}
              onChange={(e) => handleChange(e, "userData")}
              className="border p-2 rounded"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="User Email"
              value={formData.userData.email}
              onChange={(e) => handleChange(e, "userData")}
              className="border p-2 rounded"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.userData.password}
              onChange={(e) => handleChange(e, "userData")}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="User Phone"
              value={formData.userData.phone}
              onChange={(e) => handleChange(e, "userData")}
              className="border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* ================= Submit ================= */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Register Agency"}
          </button>

          {message && <p className="text-sm">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default RegisterAgencyForm;

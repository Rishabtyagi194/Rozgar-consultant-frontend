"use client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import JobDetails from "../Jobs/JobDetailsById";

const UploadResumeJob = () => {
  const { id } = useParams(); // job id
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!resume) {
      alert("Please select a CV first");
      return;
    }

    const formData = new FormData();
    formData.append("resumes", resume); // ✅ correct key

    try {
      setLoading(true);

      const token = localStorage.getItem("token"); // ✅ get token

      const res = await fetch(
        `http://147.93.72.227:5000/api/jobs/applications/HotVacancy/${id}/consultant/submit-resume`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ auth header
          },
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      alert("Resume uploaded successfully");
      setResume(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  if (!id) return <p className="text-gray-500">Invalid job</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Job Details */}
        <div className="flex-1">
          <JobDetails jobId={id} />
        </div>

        {/* Right: Upload Resume */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow rounded-xl p-6 space-y-4 sticky top-24">
            <h3 className="text-lg font-semibold">Apply for this job</h3>

            <div className="space-y-2">
              <label className="font-medium block">Upload your CV</label>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="block w-full border rounded-md p-2"
              />
            </div>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadResumeJob;

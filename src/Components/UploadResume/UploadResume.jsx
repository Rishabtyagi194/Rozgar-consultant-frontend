"use client";
import React, { useEffect, useState } from "react";
import { getAllJobs, getEmployerJobs } from "../services/getAllJobs";
import { RecommendedHeader } from "../Jobs/RecomendedHeader";
import { JobCard } from "../Jobs/JobsCard";


export const ResumeUpload = () => {
  const [activeTab, setActiveTab] = useState("All Recruiter Jobs");
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch all recruiter jobs
  const fetchAllJobs = async () => {
    setLoading(true);
    const data = await getAllJobs();
    setJobs(data || []);
    setLoading(false);
  };

  // 🔹 Fetch jobs posted by you
  const fetchEmployerJobs = async () => {
    setLoading(true);
    const data = await getEmployerJobs();
    setEmployerJobs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "All Recruiter Jobs" || activeTab === "Preferences") {
      fetchAllJobs();
    }

    if (activeTab === "Posted By you") {
      fetchEmployerJobs();
    }
  }, [activeTab]);

  const tabs = [
    { name: "All Recruiter Jobs", count: jobs.length },
    // { name: "Posted By you", count: employerJobs.length },
    // { name: "Preferences", count: jobs.length },
  ];

  const renderJobs = activeTab === "Posted By you" ? employerJobs : jobs;

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-6 space-y-4">
        {loading && <p className="text-gray-500">Loading jobs...</p>}

        {!loading && renderJobs.length === 0 && (
          <p className="text-gray-500">No jobs found</p>
        )}

        {!loading &&
          renderJobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.jobTitle}
              company={job.AboutCompany}
              experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
              salary={`${job.salaryRangeFrom} - ${job.salaryRangeTo}`}
              location={`${job.jobLocation?.city || ""}, ${job.jobLocation?.state || ""}, ${job.jobLocation?.country || ""}`}
              description={job.jobDescription}
              skills={job.skills || []}
              posted={`Posted on ${new Date(job.created_at).toDateString()}`}
              logo="/default-logo.png"
            />
          ))}
      </div>
    </div>
  );
};

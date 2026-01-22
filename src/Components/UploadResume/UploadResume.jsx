"use client";
import React, { useEffect, useState } from "react";
import { getAllJobs } from "../services/getAllJobs";
import { RecommendedHeader } from "../Jobs/RecomendedHeader";
import { JobCard } from "../Jobs/JobsCard";

export const ResumeUpload = () => {
  const [activeTab, setActiveTab] = useState("All Recruiter Jobs");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const data = await getAllJobs();
      setJobs(Array.isArray(data) ? data : data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const tabs = [{ name: "All Recruiter Jobs", count: jobs.length }];

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-6 space-y-4">
        {loading && <p className="text-gray-500">Loading jobs...</p>}

        {!loading && jobs.length === 0 && (
          <p className="text-gray-500">No jobs found</p>
        )}

        {!loading &&
          jobs.map((job, index) => (
            <JobCard
              key={job.job_id || index}
              job={job}
              title={job.jobTitle}
              company={job.AboutCompany}
              experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
              salary={
                job.salaryRangeFrom && job.salaryRangeTo
                  ? `${job.salaryRangeFrom} - ${job.salaryRangeTo} LPA`
                  : "Not disclosed"
              }
              location={job.jobLocation}
              description={job.jobDescription}
              skills={job.skills || []}
              posted={`Posted on ${new Date(
                job.created_at
              ).toDateString()}`}
              logo="/default-logo.png"
              redirectTo={(job) =>
                `/upload-resume/jobs/${job.job_id}`
              }
            />
          ))}
      </div>
    </div>
  );
};

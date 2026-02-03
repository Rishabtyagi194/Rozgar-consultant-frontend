"use client";

import React, { useEffect, useState } from "react";
import { getAllInternships, getAllJobs } from "../services/getAllJobs";
import { RecommendedHeader } from "../Jobs/RecomendedHeader";
import { JobCard } from "../Jobs/JobsCard";

export const ResumeUpload = () => {
  const [activeTab, setActiveTab] = useState("All Recruiter Jobs");
  const [jobs, setJobs] = useState([]);
  const [internship, setInternship] = useState([]);
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

  const fetchAllInternship = async () => {
    try {
      setLoading(true);
      const data = await getAllInternships();
      setInternship(Array.isArray(data) ? data : data?.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
    fetchAllInternship();
  }, []);

  const tabs = [
    { name: "All Recruiter Jobs", count: jobs.length },
    { name: "All Recruiter Internship", count: internship.length },
  ];

  const isJobTab = activeTab === "All Recruiter Jobs";
  const dataToRender = isJobTab ? jobs : internship;

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-6 space-y-4">
        {loading && (
          <p className="text-gray-500">
            Loading {isJobTab ? "jobs" : "internships"}...
          </p>
        )}

        {!loading && dataToRender.length === 0 && (
          <p className="text-gray-500">
            No {isJobTab ? "jobs" : "internships"} found
          </p>
        )}

        {!loading &&
          dataToRender.map((item, index) => (
            <JobCard
              key={item.job_id || item.internship_id || index}
              job={item}
              title={item.jobTitle || item.internshipTitle}
              company={item.AboutCompany}
              experience={
                isJobTab
                  ? `${item.experinceFrom} - ${item.experinceTo} yrs`
                  : "Internship"
              }
              salary={
                item.salaryRangeFrom && item.salaryRangeTo
                  ? `${item.salaryRangeFrom} - ${item.salaryRangeTo} LPA`
                  : "Not disclosed"
              }
              location={item.jobLocation}
              description={item.jobDescription}
              skills={item.skills || []}
              posted={`Posted on ${new Date(
                item.created_at
              ).toDateString()}`}
              logo="/default-logo.png"
              redirectTo={() =>
                isJobTab
                  ? `/upload-resume/jobs/${item.job_id}`
                  : `/upload-resume/internship/${item.internship_id}`
              }
            />
          ))}
      </div>
    </div>
  );
};

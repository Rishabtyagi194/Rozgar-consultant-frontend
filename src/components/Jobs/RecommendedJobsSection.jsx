"use client";
import React, { useEffect, useState } from "react";
import { getAllJobs, getEmployerJobs } from "../services/getAllJobs";
import { JobCard } from "./JobsCard";
import { RecommendedHeader } from "./RecomendedHeader";
import {JobSkeleton} from '../global/JobSkeleton'

export const RecommendedJobsSection = () => {
  const [activeTab, setActiveTab] = useState("All Recruiter Jobs");
  const [jobs, setJobs] = useState([]);
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Normalize API response
  const normalizeJobs = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response?.data;
    if (Array.isArray(response?.jobs)) return response?.jobs;
    return [];
  };

  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const res = await getAllJobs();
      setJobs(normalizeJobs(res));
    } catch (err) {
      console.error(err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);
      const res = await getEmployerJobs();
      setEmployerJobs(normalizeJobs(res));
    } catch (err) {
      console.error(err);
      setEmployerJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "Posted By you") {
      fetchEmployerJobs();
    } else {
      fetchAllJobs();
    }
  }, [activeTab]);

  const tabs = [
    { name: "All Recruiter Jobs", count: jobs?.length },
    { name: "Posted By you", count: employerJobs?.length },
    { name: "Preferences", count: jobs?.length },
  ];

  const renderJobs =
    activeTab === "Posted By you"
      ? employerJobs
      : jobs;

  return (
    <div className="bg-white border-b border-gray-100 px-8 py-4 w-full">
      <RecommendedHeader
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="mt-6 space-y-4">
        {/* 🔹 Skeleton Loader */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <JobSkeleton key={i} />
          ))}

        {/* 🔹 Empty State */}
        {!loading && renderJobs.length === 0 && (
          <p className="text-gray-500 text-sm">No jobs found</p>
        )}

        {/* 🔹 Job Cards */}
        {!loading &&
          renderJobs.map((job, index) => (
            <JobCard
            key={job.job_id || index}
            job={job} // ✅ THIS WAS MISSING
              title={job.jobTitle}
              company={job.postedBy || "Company"}
              rating={job.rating || 0}
              reviews={job.reviews || 0}
              experience={`${job.experinceFrom} - ${job.experinceTo} yrs`}
              salary={
                job.salaryRangeFrom && job.salaryRangeTo
                  ? `${job.salaryRangeFrom} - ${job.salaryRangeTo} LPA`
                  : "Not disclosed"
              }
              
              location={job.jobLocation}
              description={job.jobDescription || "Not Disclosed"}
              skills={job.skills || [ "Not Required"]}
              posted={`Posted on ${new Date(
                job.created_at
              ).toDateString()}`}
              logo={job.logo || "/default-logo.png"}
              redirectTo={(job) =>
                `/jobposting/${job.job_id}`
              }
            />
          ))}
      </div>
    </div>
  );
};

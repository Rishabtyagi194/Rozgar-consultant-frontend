"use client";
import React, { useMemo } from "react";
import {
  FaBriefcase,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaBookmark,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const JobCard = ({
  title,
  company,
  rating = 0,
  reviews = 0,
  experience,
  salary,
  location,
  description,
  skills = [],
  posted,
  logo,
  job,
  redirectTo, // ✅ dynamic route handler
}) => {
  const navigate = useNavigate();

  const openJobDetails = () => {
    if (!job?.job_id) return;

    // ✅ dynamic routing
    const targetPath =
      typeof redirectTo === "function"
        ? redirectTo(job)
        : redirectTo?.replace(":id", job.job_id);

    if (targetPath) {
      navigate(targetPath);
    }
  };

  const skillsArray = Array.isArray(skills)
    ? skills
    : typeof skills === "string"
    ? skills.split(",").map((s) => s.trim())
    : [];

  const normalizedLocation = useMemo(() => {
    if (!location) return "";
    if (typeof location === "object") {
      return [location.city, location.state, location.country]
        .filter(Boolean)
        .join(", ");
    }
    if (typeof location === "string") {
      try {
        const parsed = JSON.parse(location);
        return [parsed.city, parsed.state, parsed.country]
          .filter(Boolean)
          .join(", ");
      } catch {
        return location;
      }
    }
    return "";
  }, [location]);

  return (
    <div
      onClick={openJobDetails}
      className="cursor-pointer bg-white shadow-sm border border-gray-100 rounded-2xl p-5 flex justify-between items-start hover:shadow-md transition-all duration-200 w-full max-w-3xl mx-auto mt-5"
    >
      {/* Left */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
          <span className="font-medium text-gray-700">{company}</span>
          <FaStar className="text-yellow-500 text-xs" />
          <span>{rating}</span>
          <span className="text-gray-400">|</span>
          <span>{reviews} Reviews</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-gray-700 text-sm mt-4">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <span>{experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRupeeSign />
            <span>{salary}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{normalizedLocation || "Not Disclosed"}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-3">{description}</p>

        <div className="flex flex-wrap gap-2 mt-3 text-sm text-indigo-700">
          {skillsArray.length ? (
            skillsArray.map((skill, i) => (
              <span
                key={i}
                className="bg-indigo-50 px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No skills specified</span>
          )}
        </div>

        <p className="text-gray-400 text-xs mt-3">{posted}</p>
      </div>

      {/* Right */}
      <div className="flex flex-col items-center">
        <img
          src={logo}
          alt="Company Logo"
          className="w-12 h-12 rounded-xl object-cover border"
        />

        {/* Prevent navigation on Save click */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 mt-6 text-gray-500 text-sm cursor-pointer hover:text-gray-700"
        >
          <FaBookmark />
          <span>Save</span>
        </div>
      </div>
    </div>
  );
};

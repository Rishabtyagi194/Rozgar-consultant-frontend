export const getAllJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ FIXED

    const res = await fetch("https://qa.api.rozgardwar.cloud/api/jobs/all-jobs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("Jobs API Response:", data);

    return data?.jobs || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};

export const getAllInternships = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://qa.api.rozgardwar.cloud/api/internship/employer-internships",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (Array.isArray(data?.jobs)) {
      setInternshipsActive(data.jobs.filter((job) => job.Status === "active"));

      setInternshipsDraft(
        data.jobs.filter(
          (job) => job.Status === "draft" || job.Status === "inactive"
        )
      );
    }
  } catch (error) {
    console.error("Error fetching internships:", error);
  }
};

export const getEmployerJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // make sure token is stored

    const res = await fetch(
      "https://qa.api.rozgardwar.cloud/api/jobs/employer-jobs",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch employer jobs");
    }

    const data = await res.json();
    return data?.data || data; // adjust based on API response
  } catch (error) {
    console.error("Employer jobs error:", error);
    return [];
  }
};

export const saveJob = async (jobId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`/api/jobs/save/${jobId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

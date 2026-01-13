export const getAllJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ FIXED

    const res = await fetch("http://147.93.72.227:5000/api/jobs/all-jobs", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log("Jobs API Response:", data);

    return data?.AllJobs || [];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};


export const getEmployerJobs = async () => {
  try {
    const token = localStorage.getItem("token"); // make sure token is stored

    const res = await fetch("http://147.93.72.227:5000/api/jobs/employer-jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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

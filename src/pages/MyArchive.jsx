"use client";
import React, { useEffect, useState, useMemo } from "react";

const MyArchive = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://qa.api.rozgardwar.cloud/api/excel/list", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await response.json();
      console.log("API Response:", json);

      setTotal(json.total || 0);

      const list = json.uploads || json.data || [];

      const formatted = list.map((item) => ({
        id: item.id,
        created_at: item.created_at,
        ...item.data_json, // ⭐ dynamic fields from excel
      }));

      setData(formatted);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DYNAMIC COLUMNS =================
  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }, [data]);

  // ================= SEARCH =================
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  // ================= SORT =================
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bVal = b[sortConfig.key]?.toString().toLowerCase() || "";

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  // ================= UI =================
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Archive ({total})
        </h2>

        {/* Search */}
        <input
          type="text"
          placeholder="Search anything..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 mt-10">Loading data...</p>
      )}

      {/* Table */}
      {!loading && data.length > 0 && (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col}
                    onClick={() => handleSort(col)}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none hover:bg-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      {col.replace(/_/g, " ").toUpperCase()}
                      {sortConfig.key === col && (
                        <span className="text-xs">
                          {sortConfig.direction === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {sortedData.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50 transition">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap"
                    >
                      {row[col]?.toString() || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No Data */}
      {!loading && sortedData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No data found.</p>
      )}
    </div>
  );
};

export default MyArchive;

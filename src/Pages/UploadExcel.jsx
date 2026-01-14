import React, { useState, useMemo } from "react";
import ExcelUpload from "../Components/MyArchive/ExcelUpload";

const UploadExcel = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // 🔍 Filter logic
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter((row) =>
      Object.values(row).some((value) =>
        value
          ?.toString()
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  return (
    <div className="p-6">
      {/* Upload Section */}
      <ExcelUpload data={data} setData={setData} />

      {/* 🔍 Search Bar */}
      {data.length > 0 && (
        <div className="max-w-md mx-auto mb-6">
          <input
            type="text"
            placeholder="Search by name, email, phone, etc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Cards */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-6 max-w-6xl mx-auto">
        {filteredData.map((row, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 border border-gray-100 hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg text-gray-700 mb-2">
              Candidate {index + 1}
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <span className="font-medium text-gray-800">{key}:</span>{" "}
                  {value?.toString()}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* No results */}
      {data.length > 0 && filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No results found.</p>
      )}
    </div>
  );
};

export default UploadExcel;

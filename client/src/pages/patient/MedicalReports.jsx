import { useEffect, useState } from "react";
import api from "../../services/api";

const MedicalReports = () => {
  // Reports
  const [reports, setReports] = useState([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [reportType, setReportType] = useState("lab-report");
  const [reportDate, setReportDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // UI states
  const [loading, setLoading] = useState(false);
  const [fetchingReports, setFetchingReports] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================================================
  // GET PATIENT REPORTS
  // =========================================================

  const fetchReports = async () => {
    try {
      setFetchingReports(true);
      setError("");

      const response = await api.get("/reports");

      setReports(response.data.reports || []);
    } catch (error) {
      console.error("Fetch reports error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch medical reports"
      );
    } finally {
      setFetchingReports(false);
    }
  };

  // =========================================================
  // LOAD REPORTS WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    fetchReports();
  }, []);

  // =========================================================
  // FILE CHANGE
  // =========================================================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // 10 MB limit
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  // =========================================================
  // UPLOAD MEDICAL REPORT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validate file
    if (!file) {
      setError("Please select a medical report file");
      return;
    }

    // Validate title
    if (!title.trim()) {
      setError("Report title is required");
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT:
      // Use FormData because we are uploading a file
      const data = new FormData();

      data.append("title", title);
      data.append("reportType", reportType);
      data.append("reportDate", reportDate);
      data.append("description", description);

      // IMPORTANT:
      // The field name must be "file"
      // because backend uses upload.single("file")
      data.append("file", file);

      console.log("Uploading medical report...");
      console.log("Title:", title);
      console.log("Report Type:", reportType);
      console.log("Report Date:", reportDate);
      console.log("Description:", description);
      console.log("File:", file);

      // Do NOT manually set Content-Type
      await api.post("/reports", data);

      setSuccess("Medical report uploaded successfully");

      // Clear form
      setTitle("");
      setReportType("lab-report");
      setReportDate("");
      setDescription("");
      setFile(null);

      // Reset file input
      const fileInput = document.getElementById("reportFile");

      if (fileInput) {
        fileInput.value = "";
      }

      // Refresh reports
      await fetchReports();
    } catch (error) {
      console.error("Upload error:", error);
      console.error("Response:", error.response?.data);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to upload medical report"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // DELETE MEDICAL REPORT
  // =========================================================

  const handleDelete = async (reportId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this medical report?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/reports/${reportId}`);

      setSuccess("Medical report deleted successfully");

      await fetchReports();
    } catch (error) {
      console.error("Delete report error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete medical report"
      );
    }
  };

  // =========================================================
  // VIEW REPORT
  // =========================================================

  const handleViewReport = (fileUrl) => {
    if (!fileUrl) {
      setError("Report file URL is not available");
      return;
    }

    const fullUrl = `http://localhost:5000${fileUrl}`;

    window.open(fullUrl, "_blank");
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not provided";
    }

    return new Date(date).toLocaleDateString("en-IN");
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Medical Reports
          </h1>

          <p className="mt-2 text-gray-500">
            Upload and manage your medical reports, lab reports,
            X-rays and scan documents.
          </p>
        </div>

        {/* =====================================================
            SUCCESS MESSAGE
        ====================================================== */}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* =====================================================
            ERROR MESSAGE
        ====================================================== */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* =====================================================
            UPLOAD FORM
        ====================================================== */}

        <div className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Upload Medical Report
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Title */}

            <div className="mb-5">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Report Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Example: Blood Test"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Report Type */}

            <div className="mb-5">
              <label
                htmlFor="reportType"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Report Type
              </label>

              <select
                id="reportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="lab-report">
                  Lab Report
                </option>

                <option value="x-ray">
                  X-Ray
                </option>

                <option value="scan">
                  Scan
                </option>

                <option value="prescription">
                  Prescription
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* Report Date */}

            <div className="mb-5">
              <label
                htmlFor="reportDate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Report Date
              </label>

              <input
                id="reportDate"
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Description */}

            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter report description"
                rows="4"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* File */}

            <div className="mb-6">
              <label
                htmlFor="reportFile"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Report File
              </label>

              <input
                id="reportFile"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5"
                required
              />

              <p className="mt-2 text-xs text-gray-500">
                Allowed formats: PDF, JPG, JPEG, PNG. Maximum
                file size: 10MB.
              </p>

              {/* Selected file */}

              {file && (
                <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                  Selected file:{" "}
                  <span className="font-semibold">
                    {file.name}
                  </span>
                </div>
              )}
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Uploading..."
                : "Upload Report"}
            </button>
          </form>
        </div>

        {/* =====================================================
            REPORT LIST
        ====================================================== */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              My Medical Reports
            </h2>

            <button
              onClick={fetchReports}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>

          {/* Loading */}

          {fetchingReports && (
            <div className="py-10 text-center text-gray-500">
              Loading medical reports...
            </div>
          )}

          {/* No reports */}

          {!fetchingReports && reports.length === 0 && (
            <div className="rounded-lg bg-gray-50 py-10 text-center">
              <p className="text-gray-500">
                No medical reports found.
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Upload your first medical report using the
                form above.
              </p>
            </div>
          )}

          {/* Reports */}

          {!fetchingReports && reports.length > 0 && (
            <div className="space-y-4">

              {reports.map((report) => (
                <div
                  key={report._id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row">

                    {/* Report information */}

                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {report.title}
                      </h3>

                      <div className="mt-2 space-y-1 text-sm text-gray-500">

                        <p>
                          <span className="font-medium">
                            Type:
                          </span>{" "}
                          {report.reportType}
                        </p>

                        <p>
                          <span className="font-medium">
                            Report Date:
                          </span>{" "}
                          {formatDate(report.reportDate)}
                        </p>

                        <p>
                          <span className="font-medium">
                            Uploaded:
                          </span>{" "}
                          {formatDate(report.createdAt)}
                        </p>

                        {report.description && (
                          <p>
                            <span className="font-medium">
                              Description:
                            </span>{" "}
                            {report.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="flex items-center gap-3">

                      {/* View */}

                      <button
                        onClick={() =>
                          handleViewReport(report.fileUrl)
                        }
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                      >
                        View
                      </button>

                      {/* Delete */}

                      <button
                        onClick={() =>
                          handleDelete(report._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalReports;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const DoctorAccessRequests = () => {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId.trim()) {
      setError("Patient ID is required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await api.post(
        "/doctors/patient-access",
        {
          patientId: patientId.trim(),
        }
      );

      setMessage(
        response.data.message ||
          "Access request sent successfully"
      );

      setPatientId("");
    } catch (err) {
      console.error(
        "Patient access request error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to send access request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          {/* Logo / Page Name */}
          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              HEALTH-BRIDGE
            </h1>

            <p className="text-sm text-gray-500">
              Patient Access
            </p>
          </div>

          {/* Back to Dashboard */}
          <button
            onClick={() =>
              navigate("/doctor/dashboard")
            }
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            ← Back to Dashboard
          </button>

        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-3xl p-6">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Access
          </h1>

          <p className="mt-2 text-gray-600">
            Request access to a patient's health records.
          </p>
        </div>

        {/* ================= REQUEST FORM ================= */}
        <div className="rounded-xl bg-white p-6 shadow-md">

          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            Request Patient Access
          </h2>

          <p className="mb-6 text-sm text-gray-500">
            Enter the patient's Patient ID to request
            access to their medical records.
          </p>

          {/* Success Message */}
          {message && (
            <div className="mb-5 rounded-lg bg-green-100 p-3 text-green-700">
              {message}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Patient ID */}
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Patient ID
            </label>

            <input
              type="text"
              value={patientId}
              onChange={(e) =>
                setPatientId(e.target.value)
              }
              placeholder="Enter patient ID"
              className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Sending Request..."
                : "Request Access"}
            </button>

          </form>
        </div>

        {/* ================= INFORMATION ================= */}
        <div className="mt-6 rounded-xl bg-blue-50 p-6">

          <h2 className="mb-3 text-lg font-semibold text-blue-800">
            About Patient Access
          </h2>

          <ul className="space-y-2 text-sm text-blue-700">

            <li>
              • Access requests are created with a
              pending status.
            </li>

            <li>
              • Patient records should only be accessed
              with appropriate authorization.
            </li>

            <li>
              • Different health record categories can be
              controlled through permissions.
            </li>

          </ul>
        </div>

      </main>
    </div>
  );
};

export default DoctorAccessRequests;
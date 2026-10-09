import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const DoctorPatients = () => {
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!patientId.trim()) {
      setError("Please enter a patient ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPatient(null);
      setHistory([]);

      const response = await api.get(
        `/doctors/patient/${patientId.trim()}/medical-history`
      );

      setPatient(response.data.patient);
      setHistory(response.data.history || []);
    } catch (error) {
      console.error(
        "Get patient records error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to fetch patient records"
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
              Patient Records
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
      <main className="mx-auto max-w-6xl p-6">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Records
          </h1>

          <p className="mt-2 text-gray-600">
            View authorized patient medical records.
          </p>
        </div>

        {/* ================= SEARCH PATIENT ================= */}
        <form
          onSubmit={handleSearch}
          className="mb-6 rounded-xl bg-white p-6 shadow-md"
        >
          <label className="mb-2 block font-medium text-gray-700">
            Patient ID
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={patientId}
              onChange={(e) =>
                setPatientId(e.target.value)
              }
              placeholder="Enter patient ID"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Loading..."
                : "View Records"}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-100 p-3 text-red-700">
              {error}
            </div>
          )}
        </form>

        {/* ================= PATIENT INFORMATION ================= */}
        {patient && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              Patient Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Name */}
              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-medium text-gray-800">
                  {patient.user?.name ||
                    "Not available"}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-medium text-gray-800">
                  {patient.user?.email ||
                    "Not available"}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="font-medium text-gray-800">
                  {patient.phone ||
                    "Not available"}
                </p>
              </div>

              {/* Blood Group */}
              <div>
                <p className="text-sm text-gray-500">
                  Blood Group
                </p>

                <p className="font-medium text-gray-800">
                  {patient.bloodGroup ||
                    "Not available"}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ================= MEDICAL HISTORY ================= */}
        {patient && (
          <div className="rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-5 text-xl font-semibold text-gray-800">
              Medical History
            </h2>

            {history.length === 0 ? (
              <div className="rounded-lg bg-gray-50 p-5">
                <p className="text-gray-500">
                  No medical history found.
                </p>
              </div>
            ) : (
              <div className="space-y-4">

                {history.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-lg border border-gray-200 p-5"
                  >

                    {/* Condition */}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.condition}
                    </h3>

                    {/* Diagnosis Date */}
                    <p className="mt-2 text-gray-600">
                      <strong>
                        Diagnosis Date:
                      </strong>{" "}
                      {item.diagnosisDate
                        ? new Date(
                            item.diagnosisDate
                          ).toLocaleDateString("en-IN")
                        : "Not available"}
                    </p>

                    {/* Description */}
                    <p className="mt-2 text-gray-700">
                      <strong>
                        Description:
                      </strong>{" "}
                      {item.description ||
                        "Not available"}
                    </p>

                    {/* Treatment */}
                    <p className="mt-2 text-gray-700">
                      <strong>
                        Treatment:
                      </strong>{" "}
                      {item.treatment ||
                        "Not available"}
                    </p>

                  </div>
                ))}

              </div>
            )}

          </div>
        )}

      </main>
    </div>
  );
};

export default DoctorPatients;
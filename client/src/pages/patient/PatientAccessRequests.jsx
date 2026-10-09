import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const PatientAccessRequests = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [approvingId, setApprovingId] = useState(null);
  const [rejectingId, setRejectingId] = useState(null);

  // Fetch access requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/doctors/patient-access"
      );

      setRequests(response.data.requests || []);
    } catch (error) {
      console.error(
        "Get access requests error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load access requests"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Approve access
  const handleApprove = async (accessId) => {
    try {
      setApprovingId(accessId);
      setError("");

      await api.put(
        `/doctors/patient-access/${accessId}/approve`
      );

      alert("Access request approved successfully");

      await fetchRequests();
    } catch (error) {
      console.error(
        "Approve access error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to approve access request"
      );
    } finally {
      setApprovingId(null);
    }
  };

  // Reject access
  const handleReject = async (accessId) => {
    try {
      setRejectingId(accessId);
      setError("");

      await api.put(
        `/doctors/patient-access/${accessId}/reject`
      );

      alert("Access request rejected successfully");

      await fetchRequests();
    } catch (error) {
      console.error(
        "Reject access error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to reject access request"
      );
    } finally {
      setRejectingId(null);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading access requests...
        </p>
      </div>
    );
  }

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
      <main className="mx-auto max-w-6xl p-6">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Patient Access Requests
          </h1>

          <p className="mt-2 text-gray-600">
            Manage requests from patients to access
            their medical records.
          </p>
        </div>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* ================= NO REQUESTS ================= */}
        {requests.length === 0 ? (
          <div className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-gray-500">
              No access requests found.
            </p>
          </div>
        ) : (

          /* ================= REQUEST LIST ================= */
          <div className="space-y-4">

            {requests.map((request) => (
              <div
                key={request._id}
                className="rounded-xl bg-white p-6 shadow-md"
              >

                {/* Request Title */}
                <h2 className="mb-4 text-lg font-semibold text-gray-800">
                  Doctor Access Request
                </h2>

                {/* Doctor Name */}
                <p className="text-gray-700">
                  <strong>Doctor:</strong>{" "}
                  {request.doctor?.user?.name ||
                    "Doctor"}
                </p>

                {/* Email */}
                <p className="mt-1 text-gray-700">
                  <strong>Email:</strong>{" "}
                  {request.doctor?.user?.email ||
                    "Not available"}
                </p>

                {/* Specialization */}
                <p className="mt-1 text-gray-700">
                  <strong>Specialization:</strong>{" "}
                  {request.doctor?.specialization ||
                    "Not available"}
                </p>

                {/* Status */}
                <p className="mt-3 text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      request.status === "pending"
                        ? "font-medium text-yellow-600"
                        : request.status === "approved"
                        ? "font-medium text-green-600"
                        : "font-medium text-red-600"
                    }
                  >
                    {request.status}
                  </span>
                </p>

                {/* ================= ACTIONS ================= */}
                {request.status === "pending" && (
                  <div className="mt-5 flex flex-wrap gap-3">

                    {/* Approve */}
                    <button
                      onClick={() =>
                        handleApprove(request._id)
                      }
                      disabled={
                        approvingId === request._id ||
                        rejectingId === request._id
                      }
                      className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {approvingId === request._id
                        ? "Approving..."
                        : "Approve Access"}
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() =>
                        handleReject(request._id)
                      }
                      disabled={
                        approvingId === request._id ||
                        rejectingId === request._id
                      }
                      className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {rejectingId === request._id
                        ? "Rejecting..."
                        : "Reject Access"}
                    </button>

                  </div>
                )}

                {/* Approved Message */}
                {request.status === "approved" && (
                  <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    This doctor has approved access to
                    the requested patient records.
                  </div>
                )}

                {/* Rejected Message */}
                {request.status === "revoked" && (
                  <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    This access request has been rejected.
                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
};

export default PatientAccessRequests;
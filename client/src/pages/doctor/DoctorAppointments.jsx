import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch doctor appointments
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/appointments/doctor");

      setAppointments(response.data.appointments || []);
    } catch (err) {
      console.error("Fetch doctor appointments error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load appointments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Update appointment status
  const updateStatus = async (appointmentId, status) => {
    try {
      setError("");

      await api.put(
        `/appointments/${appointmentId}/status`,
        { status }
      );

      await fetchAppointments();
    } catch (err) {
      console.error(
        "Update appointment status error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update appointment"
      );
    }
  };

  // Format appointment date
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // Status styling
  const getStatusClass = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";

      case "completed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading appointments...
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
              Doctor Appointments
            </p>
          </div>

          {/* Back to Dashboard */}
          <button
            onClick={() => navigate("/doctor/dashboard")}
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
            Doctor Appointments
          </h1>

          <p className="mt-2 text-gray-600">
            View and manage your patient appointments.
          </p>
        </div>

        {/* ================= ERROR MESSAGE ================= */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* ================= NO APPOINTMENTS ================= */}
        {appointments.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-md">

            <h2 className="text-xl font-semibold text-gray-700">
              No appointments found
            </h2>

            <p className="mt-2 text-gray-500">
              You currently have no patient appointments.
            </p>

          </div>
        ) : (

          /* ================= APPOINTMENT LIST ================= */
          <div className="space-y-5">

            {appointments.map((appointment) => (

              <div
                key={appointment._id}
                className="rounded-xl bg-white p-6 shadow-md"
              >

                {/* ================= TOP SECTION ================= */}
                <div className="flex flex-col justify-between gap-4 md:flex-row">

                  {/* Patient Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {appointment.patient?.user?.name ||
                        "Patient"}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {appointment.patient?.user?.email ||
                        "Email not available"}
                    </p>
                  </div>

                  {/* Status */}
                  <span
                    className={`h-fit rounded-full px-3 py-1 text-sm font-medium ${getStatusClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>

                </div>

                {/* ================= APPOINTMENT DETAILS ================= */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  {/* Appointment Date */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Appointment Date
                    </p>

                    <p className="font-medium text-gray-800">
                      {formatDate(
                        appointment.appointmentDate
                      )}
                    </p>
                  </div>

                  {/* Reason */}
                  <div>
                    <p className="text-sm text-gray-500">
                      Reason
                    </p>

                    <p className="font-medium text-gray-800">
                      {appointment.reason ||
                        "No reason provided"}
                    </p>
                  </div>

                </div>

                {/* ================= ACTION BUTTONS ================= */}
                {appointment.status === "scheduled" && (
                  <div className="mt-6 flex flex-wrap gap-3">

                    {/* Complete */}
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment._id,
                          "completed"
                        )
                      }
                      className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                    >
                      Mark Completed
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() =>
                        updateStatus(
                          appointment._id,
                          "cancelled"
                        )
                      }
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Cancel Appointment
                    </button>

                  </div>
                )}

                {/* ================= COMPLETED MESSAGE ================= */}
                {appointment.status === "completed" && (
                  <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    This appointment has been completed.
                  </div>
                )}

                {/* ================= CANCELLED MESSAGE ================= */}
                {appointment.status === "cancelled" && (
                  <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                    This appointment has been cancelled.
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

export default DoctorAppointments;
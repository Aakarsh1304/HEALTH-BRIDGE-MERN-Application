import { useEffect, useState } from "react";
import api from "../../services/api";

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET DOCTORS
  // =====================================================

  const fetchDoctors = async () => {
    try {
      // This endpoint assumes your doctor backend exposes
      // GET /api/doctors
      const response = await api.get("/doctors");

      setDoctors(response.data.doctors || []);
    } catch (error) {
      console.error("Fetch doctors error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load doctors"
      );
    }
  };

  // =====================================================
  // GET PATIENT APPOINTMENTS
  // =====================================================

  const fetchAppointments = async () => {
    try {
      setFetching(true);

      const response = await api.get("/appointments/patient");

      setAppointments(response.data.appointments || []);
    } catch (error) {
      console.error("Fetch appointments error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load appointments"
      );
    } finally {
      setFetching(false);
    }
  };

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  // =====================================================
  // BOOK APPOINTMENT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!doctorId) {
      setError("Please select a doctor");
      return;
    }

    if (!appointmentDate) {
      setError("Please select an appointment date and time");
      return;
    }

    if (!reason.trim()) {
      setError("Please enter the reason for the appointment");
      return;
    }

    try {
      setLoading(true);

      await api.post("/appointments", {
        doctorId,
        appointmentDate,
        reason,
      });

      setSuccess("Appointment booked successfully");

      // Clear form
      setDoctorId("");
      setAppointmentDate("");
      setReason("");

      // Refresh appointments
      await fetchAppointments();
    } catch (error) {
      console.error("Book appointment error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to book appointment"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // CANCEL APPOINTMENT
  // =====================================================

  const handleCancel = async (appointmentId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.put(
        `/appointments/${appointmentId}/status`,
        {
          status: "cancelled",
        }
      );

      setSuccess("Appointment cancelled successfully");

      await fetchAppointments();
    } catch (error) {
      console.error("Cancel appointment error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to cancel appointment"
      );
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Not available";
    }

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // =====================================================
  // STATUS STYLE
  // =====================================================

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

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl">

        {/* PAGE HEADER */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Appointments
          </h1>

          <p className="mt-2 text-gray-500">
            Book appointments with doctors and manage your
            scheduled visits.
          </p>
        </div>

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* =================================================
            BOOK APPOINTMENT
        ================================================== */}

        <div className="mb-10 rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Book an Appointment
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Doctor */}

            <div className="mb-5">
              <label
                htmlFor="doctor"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Select Doctor
              </label>

              <select
                id="doctor"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              >
                <option value="">
                  Select a doctor
                </option>

                {doctors.map((doctor) => (
                  <option
                    key={doctor._id}
                    value={doctor._id}
                  >
                    {doctor.user?.name || "Doctor"} -{" "}
                    {doctor.specialization || "General"}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}

            <div className="mb-5">
              <label
                htmlFor="appointmentDate"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Appointment Date & Time
              </label>

              <input
                id="appointmentDate"
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) =>
                  setAppointmentDate(e.target.value)
                }
                min={new Date().toISOString().slice(0, 16)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Reason */}

            <div className="mb-6">
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Reason for Appointment
              </label>

              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Example: Regular health consultation"
                rows="4"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading
                ? "Booking..."
                : "Book Appointment"}
            </button>
          </form>
        </div>

        {/* =================================================
            MY APPOINTMENTS
        ================================================== */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              My Appointments
            </h2>

            <button
              onClick={fetchAppointments}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>

          {/* Loading */}

          {fetching && (
            <div className="py-10 text-center text-gray-500">
              Loading appointments...
            </div>
          )}

          {/* Empty */}

          {!fetching && appointments.length === 0 && (
            <div className="rounded-lg bg-gray-50 py-10 text-center">
              <p className="text-gray-500">
                No appointments found.
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Book your first appointment using the form above.
              </p>
            </div>
          )}

          {/* Appointment List */}

          {!fetching && appointments.length > 0 && (
            <div className="space-y-4">

              {appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-xl border border-gray-200 p-5 transition hover:shadow-sm"
                >

                  <div className="flex flex-col justify-between gap-5 md:flex-row">

                    {/* Appointment Details */}

                    <div>

                      <h3 className="text-lg font-semibold text-gray-800">
                        {appointment.doctor?.user?.name ||
                          "Doctor"}
                      </h3>

                      <p className="mt-1 text-sm text-blue-600">
                        {appointment.doctor?.specialization ||
                          "Medical Doctor"}
                      </p>

                      <div className="mt-4 space-y-2 text-sm text-gray-600">

                        <p>
                          <span className="font-medium">
                            Date & Time:
                          </span>{" "}
                          {formatDate(
                            appointment.appointmentDate
                          )}
                        </p>

                        <p>
                          <span className="font-medium">
                            Reason:
                          </span>{" "}
                          {appointment.reason ||
                            "Not provided"}
                        </p>

                        {appointment.doctor?.hospital && (
                          <p>
                            <span className="font-medium">
                              Hospital:
                            </span>{" "}
                            {appointment.doctor.hospital}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Status + Action */}

                    <div className="flex flex-col items-start gap-3 md:items-end">

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${getStatusClass(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>

                      {appointment.status ===
                        "scheduled" && (
                        <button
                          onClick={() =>
                            handleCancel(appointment._id)
                          }
                          className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                          Cancel Appointment
                        </button>
                      )}

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

export default PatientAppointments;
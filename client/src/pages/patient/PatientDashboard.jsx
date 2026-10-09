import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              HEALTH-BRIDGE
            </h1>

            <p className="text-sm text-gray-500">
              Patient Portal
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-800">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500">
              Patient
            </p>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome, {user?.name}
          </h2>

          <p className="mt-2 text-gray-500">
            Manage your health information from one place.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* My Profile */}
          <div
            onClick={() => navigate("/patient/profile")}
            className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              My Profile
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              View and update your personal information.
            </p>
          </div>

          {/* Medical History */}
          <div
            onClick={() => navigate("/patient/medical-history")}
            className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Medical History
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Access your medical history and health information.
            </p>
          </div>

          {/* Prescriptions */}
        <div
  onClick={() => navigate("/patient/prescriptions")}
  className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
  <h3 className="text-lg font-semibold text-gray-800">
    Prescriptions
  </h3>

  <p className="mt-2 text-sm text-gray-500">
    View prescriptions provided by your doctors.
  </p>
</div>

          {/* Medical Reports */}
         <div
  onClick={() => navigate("/patient/medical-reports")}
  className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
  <h3 className="text-lg font-semibold text-gray-800">
    Medical Reports
  </h3>

  <p className="mt-2 text-sm text-gray-500">
    Upload and access your medical reports.
  </p>
</div>

       <div
  onClick={() => navigate("/patient/appointments")}
  className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
  <h3 className="text-lg font-semibold text-gray-800">
    Appointments
  </h3>

  <p className="mt-2 text-sm text-gray-500">
    Book and manage doctor appointments.
  </p>
</div>

          {/* Notifications */}
         <div
  onClick={() => navigate("/patient/notifications")}
  className="cursor-pointer rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
  <h3 className="text-lg font-semibold text-gray-800">
    Notifications
  </h3>

  <p className="mt-2 text-sm text-gray-500">
    Check appointment and health-related notifications.
  </p>
</div>
<div
  onClick={() => navigate("/patient/access-requests")}
  className="cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-lg"
>
  <h2 className="text-lg font-semibold">
    Access Requests
  </h2>

  <p className="text-gray-500 mt-2">
    Review doctor requests to access your records
  </p>
</div>

        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
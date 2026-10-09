import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Profile",
      description: "View and update your doctor profile",
      path: "/doctor/profile",
    },
    {
      title: "Appointments",
      description: "View and manage patient appointments",
      path: "/doctor/appointments",
    },
    {
      title: "Patient Access",
      description: "Manage patient record access requests",
      path: "/doctor/access-requests",
    },
    {
      title: "Patient Records",
      description: "View authorized patient medical records",
      path: "/doctor/patients",
    },
    {
      title: "Prescriptions",
      description: "Create and view patient prescriptions",
      path: "/doctor/prescriptions",
    },
    {
      title: "Notifications",
      description: "View appointment and system notifications",
      path: "/doctor/notifications",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-blue-700">
            HEALTH-BRIDGE
          </h1>

          <p className="text-sm text-gray-500">
            Doctor Dashboard
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="mx-auto max-w-7xl p-6">

        {/* Dashboard Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Doctor Dashboard
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your patients, appointments,
            prescriptions and records.
          </p>
        </div>

        {/* ================= DASHBOARD CARDS ================= */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl bg-white p-6 shadow-md transition hover:shadow-lg"
            >
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                {card.title}
              </h2>

              <p className="mb-5 min-h-[40px] text-sm text-gray-600">
                {card.description}
              </p>

              <button
                onClick={() => navigate(card.path)}
                className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Open
              </button>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
};

export default DoctorDashboard;
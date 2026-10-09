import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Medical Records",
      description:
        "Access and manage important medical history in one centralized platform.",
    },
    {
      title: "Digital Prescriptions",
      description:
        "Doctors can create prescriptions and patients can view their prescribed medicines.",
    },
    {
      title: "Appointments",
      description:
        "Book and manage appointments between patients and doctors.",
    },
    {
      title: "Doctor Access",
      description:
        "Patients can control access to their medical records and approve doctor requests.",
    },
    {
      title: "Notifications",
      description:
        "Stay updated with appointment changes and important system notifications.",
    },
    {
      title: "Secure Access",
      description:
        "Role-based authentication provides separate access for patients and doctors.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= NAVBAR ================= */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-blue-700"
          >
            HEALTH-BRIDGE
          </button>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 transition hover:text-blue-600"
            >
              Home
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="text-gray-700 transition hover:text-blue-600"
            >
              Features
            </button>

            <button
              onClick={() => navigate("/login")}
              className="text-gray-700 transition hover:text-blue-600"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
            >
              Register
            </button>
          </nav>

          {/* Mobile Buttons */}
          <div className="flex gap-2 md:hidden">
            <button
              onClick={() => navigate("/login")}
              className="rounded-lg px-3 py-2 text-sm text-gray-700"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
            >
              Register
            </button>
          </div>

        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">

          {/* Left */}
          <div>

            <div className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Secure Digital Healthcare Platform
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Your Health Records,
              <span className="text-blue-600">
                {" "}Connected and Secure
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              HEALTH-BRIDGE brings medical records,
              prescriptions, appointments and healthcare
              information together in one centralized
              platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() => navigate("/login")}
                className="rounded-lg bg-blue-600 px-7 py-3 font-medium text-white shadow transition hover:bg-blue-700"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-lg border border-blue-600 bg-white px-7 py-3 font-medium text-blue-600 transition hover:bg-blue-50"
              >
                Create Account
              </button>

            </div>

          </div>

          {/* Right */}
          <div className="flex justify-center">

            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-2xl">
                  🏥
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    HEALTH-BRIDGE
                  </h2>

                  <p className="text-sm text-gray-500">
                    Healthcare Management
                  </p>
                </div>
              </div>

              <div className="space-y-4">

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Medical Records
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    Centralized & Accessible
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Appointments
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    Easy Appointment Management
                  </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500">
                    Security
                  </p>

                  <p className="mt-1 font-semibold text-gray-800">
                    Role-Based Secure Access
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        id="features"
        className="bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              Healthcare Management Features
            </h2>

            <p className="mt-4 text-gray-600">
              HEALTH-BRIDGE provides tools for managing
              healthcare information, appointments and
              communication between patients and doctors.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-xl text-blue-600">
                  ✓
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-6 text-gray-600">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-50 px-6 py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              How HEALTH-BRIDGE Works
            </h2>

            <p className="mt-4 text-gray-600">
              A simple workflow for patients and doctors.
            </p>

          </div>

          <div className="grid gap-6 md:grid-cols-4">

            {[
              {
                number: "01",
                title: "Register",
                text: "Create your patient or doctor account.",
              },
              {
                number: "02",
                title: "Login",
                text: "Securely access your healthcare dashboard.",
              },
              {
                number: "03",
                title: "Manage",
                text: "Manage records, appointments and prescriptions.",
              },
              {
                number: "04",
                title: "Connect",
                text: "Share authorized records with doctors.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-xl bg-white p-6 text-center shadow-sm"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {step.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 px-6 py-16">

        <div className="mx-auto max-w-4xl text-center">

          <h2 className="text-3xl font-bold text-white">
            Start Managing Healthcare Digitally
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-blue-100">
            Create your HEALTH-BRIDGE account and access
            your healthcare management dashboard.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-7 rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
          >
            Create Account
          </button>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 px-6 py-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row md:items-center">

          <div>
            <h2 className="text-xl font-bold text-white">
              HEALTH-BRIDGE
            </h2>

            <p className="mt-1 text-sm text-gray-400">
              Digital Healthcare Management Platform
            </p>
          </div>

          <p className="text-sm text-gray-400">
            © 2026 HEALTH-BRIDGE. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
};

export default Home;
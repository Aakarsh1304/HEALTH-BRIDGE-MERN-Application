import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Authentication
import ProtectedRoute from "./components/ProtectedRoute";

// Patient pages
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientProfile from "./pages/patient/PatientProfile";
import MedicalHistory from "./pages/patient/MedicalHistory";
import Prescriptions from "./pages/patient/Prescriptions";
import MedicalReports from "./pages/patient/MedicalReports";
import PatientAppointments from "./pages/patient/PatientAppointments";
import PatientNotifications from "./pages/patient/PatientNotifications";
import PatientAccessRequests from "./pages/patient/PatientAccessRequests";

// Doctor pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorAccessRequests from "./pages/doctor/DoctorAccessRequests";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorNotifications from "./pages/doctor/DoctorNotifications";
import DoctorPrescriptions from "./pages/doctor/DoctorPrescriptions";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= PATIENT ROUTES ================= */}

        <Route
          path="/patient"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            <ProtectedRoute role="patient">
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/medical-history"
          element={
            <ProtectedRoute role="patient">
              <MedicalHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/prescriptions"
          element={
            <ProtectedRoute role="patient">
              <Prescriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/medical-reports"
          element={
            <ProtectedRoute role="patient">
              <MedicalReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute role="patient">
              <PatientAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/access-requests"
          element={
            <ProtectedRoute role="patient">
              <PatientAccessRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/notifications"
          element={
            <ProtectedRoute role="patient">
              <PatientNotifications />
            </ProtectedRoute>
          }
        />


        {/* ================= DOCTOR ROUTES ================= */}

        <Route
          path="/doctor"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/profile"
          element={
            <ProtectedRoute role="doctor">
              <DoctorProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/access-requests"
          element={
            <ProtectedRoute role="doctor">
              <DoctorAccessRequests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute role="doctor">
              <DoctorPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/prescriptions"
          element={
            <ProtectedRoute role="doctor">
              <DoctorPrescriptions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/notifications"
          element={
            <ProtectedRoute role="doctor">
              <DoctorNotifications />
            </ProtectedRoute>
          }
        />


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
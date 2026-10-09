import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    hospital: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch doctor profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/doctors/profile");

      const doctor = response.data.doctor;

      setProfile(doctor);

      setFormData({
        specialization: doctor.specialization || "",
        qualification: doctor.qualification || "",
        experience: doctor.experience || "",
        phone: doctor.phone || "",
        hospital: doctor.hospital || "",
      });
    } catch (err) {
      console.error("Fetch doctor profile error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load doctor profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update doctor profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await api.put(
        "/doctors/profile",
        formData
      );

      setProfile(response.data.doctor);

      setMessage(
        response.data.message ||
          "Profile updated successfully"
      );
    } catch (err) {
      console.error("Update doctor profile error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading profile...
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
              Doctor Profile
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
      <main className="mx-auto max-w-4xl p-6">

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Doctor Profile
          </h1>

          <p className="mt-2 text-gray-600">
            View and update your professional information.
          </p>
        </div>

        {/* ================= USER INFORMATION ================= */}
        {profile?.user && (
          <div className="mb-6 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Account Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Name */}
              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="font-medium text-gray-800">
                  {profile.user.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-medium text-gray-800">
                  {profile.user.email}
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ================= SUCCESS MESSAGE ================= */}
        {message && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
            {message}
          </div>
        )}

        {/* ================= ERROR MESSAGE ================= */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* ================= PROFILE FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow-md"
        >

          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Professional Information
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">

            {/* Specialization */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Specialization
              </label>

              <input
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. Cardiology"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Qualification */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. MBBS, MD"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 8"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Hospital */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Hospital / Clinic
              </label>

              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                placeholder="Enter hospital or clinic name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

          </div>

          {/* ================= SAVE BUTTON ================= */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default DoctorProfile;
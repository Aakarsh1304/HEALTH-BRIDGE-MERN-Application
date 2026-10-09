import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const MedicalHistory = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    condition: "",
    diagnosisDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      const response = await api.get("/patients/medical-history");

      setHistory(response.data.medicalHistory || []);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load medical history",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await api.post("/patients/medical-history", formData);

      setSuccess("Medical history added successfully.");

      setFormData({
        condition: "",
        diagnosisDate: "",
        description: "",
      });

      fetchMedicalHistory();
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to add medical history",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading medical history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-blue-700">HEALTH-BRIDGE</h1>

            <p className="text-sm text-gray-500">Medical History</p>
          </div>

          <button
            onClick={() => navigate("/patient")}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 p-6">
        {/* Add Medical History */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Medical History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add information about a previous medical condition or diagnosis.
          </p>

          {error && (
            <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-5 rounded-lg bg-green-50 p-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Condition / Diagnosis
              </label>

              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                placeholder="e.g. Asthma"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Diagnosis Date
              </label>

              <input
                type="date"
                name="diagnosisDate"
                value={formData.diagnosisDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter additional information"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add Medical History"}
            </button>
          </form>
        </div>

        {/* Existing History */}
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">
            My Medical History
          </h2>

          {history.length === 0 ? (
            <p className="mt-6 text-gray-500">
              No medical history records found.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.condition}
                  </h3>

                  {item.diagnosisDate && (
                    <p className="mt-1 text-sm text-gray-500">
                      Diagnosis Date:{" "}
                      {new Date(item.diagnosisDate).toLocaleDateString()}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-3 text-gray-600">{item.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MedicalHistory;

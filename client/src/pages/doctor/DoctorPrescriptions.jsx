import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const DoctorPrescriptions = () => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");

  const [medicines, setMedicines] = useState([
    {
      name: "",
      dosage: "",
      frequency: "",
      duration: "",
      instructions: "",
    },
  ]);

  const [creating, setCreating] = useState(false);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);

      const response = await api.get("/prescriptions/doctor");

      setPrescriptions(response.data.prescriptions || []);
    } catch (error) {
      console.error("Get prescriptions error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load prescriptions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleMedicineChange = (index, field, value) => {
    const updatedMedicines = [...medicines];

    updatedMedicines[index][field] = value;

    setMedicines(updatedMedicines);
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (index) => {
    if (medicines.length === 1) return;

    setMedicines(
      medicines.filter(
        (_, medicineIndex) => medicineIndex !== index
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientId.trim()) {
      setError("Patient ID is required");
      return;
    }

    const hasEmptyMedicine = medicines.some(
      (medicine) => !medicine.name.trim()
    );

    if (hasEmptyMedicine) {
      setError("Medicine name is required");
      return;
    }

    try {
      setCreating(true);
      setError("");

      await api.post("/prescriptions", {
        patientId: patientId.trim(),
        medicines,
        diagnosis,
        notes,
      });

      alert("Prescription created successfully");

      setPatientId("");
      setDiagnosis("");
      setNotes("");

      setMedicines([
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: "",
        },
      ]);

      await fetchPrescriptions();
    } catch (error) {
      console.error(
        "Create prescription error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to create prescription"
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              HEALTH-BRIDGE
            </h1>

            <p className="text-sm text-gray-500">
              Doctor Prescriptions
            </p>
          </div>

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
            Doctor Prescriptions
          </h1>

          <p className="mt-2 text-gray-600">
            Create and manage prescriptions for your patients.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* ================= CREATE PRESCRIPTION ================= */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-md">

          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Create Prescription
          </h2>

          <form onSubmit={handleSubmit}>

            {/* Patient ID */}
            <div className="mb-5">
              <label className="mb-2 block font-medium text-gray-700">
                Patient ID
              </label>

              <input
                type="text"
                value={patientId}
                onChange={(e) =>
                  setPatientId(e.target.value)
                }
                placeholder="Enter patient ID"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Diagnosis */}
            <div className="mb-5">
              <label className="mb-2 block font-medium text-gray-700">
                Diagnosis
              </label>

              <input
                type="text"
                value={diagnosis}
                onChange={(e) =>
                  setDiagnosis(e.target.value)
                }
                placeholder="Enter diagnosis"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Medicines */}
            <div className="mb-5">

              <h3 className="mb-3 font-semibold text-gray-800">
                Medicines
              </h3>

              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-lg border border-gray-200 p-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                    {/* Medicine Name */}
                    <input
                      type="text"
                      placeholder="Medicine name *"
                      value={medicine.name}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    />

                    {/* Dosage */}
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={medicine.dosage}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "dosage",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    />

                    {/* Frequency */}
                    <input
                      type="text"
                      placeholder="Frequency"
                      value={medicine.frequency}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "frequency",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    />

                    {/* Duration */}
                    <input
                      type="text"
                      placeholder="Duration"
                      value={medicine.duration}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                    />

                    {/* Instructions */}
                    <input
                      type="text"
                      placeholder="Instructions"
                      value={medicine.instructions}
                      onChange={(e) =>
                        handleMedicineChange(
                          index,
                          "instructions",
                          e.target.value
                        )
                      }
                      className="rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 md:col-span-2"
                    />

                  </div>

                  {medicines.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeMedicine(index)
                      }
                      className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                    >
                      Remove Medicine
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addMedicine}
                className="rounded-lg bg-gray-700 px-4 py-2 text-white transition hover:bg-gray-800"
              >
                + Add Medicine
              </button>

            </div>

            {/* Notes */}
            <div className="mb-5">
              <label className="mb-2 block font-medium text-gray-700">
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="Additional notes"
                rows="4"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {creating
                ? "Creating..."
                : "Create Prescription"}
            </button>

          </form>
        </div>

        {/* ================= EXISTING PRESCRIPTIONS ================= */}
        <div className="rounded-xl bg-white p-6 shadow-md">

          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            My Prescriptions
          </h2>

          {loading ? (
            <p className="text-gray-600">
              Loading prescriptions...
            </p>
          ) : prescriptions.length === 0 ? (
            <div className="rounded-lg bg-gray-50 p-5">
              <p className="text-gray-500">
                No prescriptions found.
              </p>
            </div>
          ) : (
            <div className="space-y-5">

              {prescriptions.map((prescription) => (
                <div
                  key={prescription._id}
                  className="rounded-lg border border-gray-200 p-5"
                >

                  {/* Patient */}
                  <p>
                    <strong>Patient:</strong>{" "}
                    {prescription.patient?.user?.name ||
                      prescription.patient?.name ||
                      "Not available"}
                  </p>

                  {/* Diagnosis */}
                  <p className="mt-2">
                    <strong>Diagnosis:</strong>{" "}
                    {prescription.diagnosis ||
                      "Not available"}
                  </p>

                  {/* Medicines */}
                  <p className="mt-4 font-semibold">
                    Medicines
                  </p>

                  <div className="mt-2 space-y-2">

                    {prescription.medicines?.map(
                      (medicine, index) => (
                        <div
                          key={index}
                          className="rounded-lg bg-gray-50 p-3"
                        >

                          <p>
                            <strong>
                              {medicine.name}
                            </strong>
                          </p>

                          <p>
                            Dosage:{" "}
                            {medicine.dosage ||
                              "Not specified"}
                          </p>

                          <p>
                            Frequency:{" "}
                            {medicine.frequency ||
                              "Not specified"}
                          </p>

                          <p>
                            Duration:{" "}
                            {medicine.duration ||
                              "Not specified"}
                          </p>

                          <p>
                            Instructions:{" "}
                            {medicine.instructions ||
                              "None"}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                  {/* Notes */}
                  {prescription.notes && (
                    <p className="mt-3">
                      <strong>Notes:</strong>{" "}
                      {prescription.notes}
                    </p>
                  )}

                  {/* Created Date */}
                  <p className="mt-3 text-sm text-gray-500">
                    Created:{" "}
                    {new Date(
                      prescription.createdAt
                    ).toLocaleDateString("en-IN")}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default DoctorPrescriptions;
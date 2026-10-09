import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Prescriptions = () => {
  const navigate = useNavigate();

  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await api.get("/prescriptions/patient");

      setPrescriptions(response.data.prescriptions || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load prescriptions"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">
          Loading prescriptions...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-blue-700">
              HEALTH-BRIDGE
            </h1>

            <p className="text-sm text-gray-500">
              Prescriptions
            </p>
          </div>

          <button
            onClick={() => navigate("/patient")}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Back to Dashboard
          </button>

        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl space-y-6 p-6">

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            My Prescriptions
          </h2>

          <p className="mt-2 text-gray-500">
            View prescriptions provided by your doctors.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && prescriptions.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800">
              No prescriptions found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Your prescriptions will appear here after a doctor
              provides one.
            </p>
          </div>
        )}

        {/* Prescription List */}
        {prescriptions.length > 0 && (
          <div className="space-y-6">

            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                {/* Prescription Header */}
                <div className="flex flex-col justify-between gap-3 border-b pb-4 md:flex-row">

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Prescription
                    </h3>

                    {prescription.doctor && (
                      <p className="mt-1 text-sm text-gray-500">
                        Doctor:{" "}
                        <span className="font-medium text-gray-700">
                          {prescription.doctor.user?.name ||
                            prescription.doctor.name ||
                            "Doctor"}
                        </span>
                      </p>
                    )}

                    {prescription.createdAt && (
                      <p className="mt-1 text-sm text-gray-500">
                        Date:{" "}
                        {new Date(
                          prescription.createdAt
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {prescription.diagnosis && (
                    <div className="rounded-lg bg-blue-50 px-4 py-2">
                      <p className="text-xs font-medium text-blue-600">
                        Diagnosis
                      </p>

                      <p className="font-semibold text-blue-800">
                        {prescription.diagnosis}
                      </p>
                    </div>
                  )}

                </div>

                {/* Medicines */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Medicines
                  </h4>

                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[700px] border-collapse">
                      <thead>
                        <tr className="border-b bg-gray-50 text-left">
                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                            Medicine
                          </th>

                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                            Dosage
                          </th>

                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                            Frequency
                          </th>

                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                            Duration
                          </th>

                          <th className="px-4 py-3 text-sm font-semibold text-gray-700">
                            Instructions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {prescription.medicines?.map(
                          (medicine, index) => (
                            <tr
                              key={index}
                              className="border-b last:border-b-0"
                            >
                              <td className="px-4 py-3 font-medium text-gray-800">
                                {medicine.name}
                              </td>

                              <td className="px-4 py-3 text-gray-600">
                                {medicine.dosage || "-"}
                              </td>

                              <td className="px-4 py-3 text-gray-600">
                                {medicine.frequency || "-"}
                              </td>

                              <td className="px-4 py-3 text-gray-600">
                                {medicine.duration || "-"}
                              </td>

                              <td className="px-4 py-3 text-gray-600">
                                {medicine.instructions || "-"}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notes */}
                {prescription.notes && (
                  <div className="mt-6 rounded-lg bg-gray-50 p-4">
                    <h4 className="font-semibold text-gray-800">
                      Doctor's Notes
                    </h4>

                    <p className="mt-2 text-sm text-gray-600">
                      {prescription.notes}
                    </p>
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

export default Prescriptions;
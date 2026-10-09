import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const DoctorNotifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/notifications");

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Get notifications error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await api.put(
        `/notifications/${notificationId}/read`
      );

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error(
        "Mark notification as read error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to mark notification as read"
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">
          Loading notifications...
        </p>
      </div>
    );
  }

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
              Doctor Notifications
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
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Doctor Notifications
            </h1>

            <p className="mt-2 text-gray-600">
              View your appointment and system notifications.
            </p>
          </div>

          {/* Unread Count */}
          <span className="w-fit rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
            {unreadCount} Unread
          </span>

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        {/* ================= NOTIFICATIONS ================= */}
        {notifications.length === 0 ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              No notifications found
            </h2>

            <p className="mt-2 text-gray-500">
              You currently have no notifications.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`rounded-xl border p-5 shadow-md ${
                  notification.isRead
                    ? "border-gray-200 bg-white"
                    : "border-blue-200 bg-blue-50"
                }`}
              >

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">

                  {/* Notification Content */}
                  <div className="flex-1">

                    <h2 className="text-lg font-semibold text-gray-800">
                      {notification.title}
                    </h2>

                    <p className="mt-1 text-gray-600">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      {notification.createdAt
                        ? new Date(
                            notification.createdAt
                          ).toLocaleString("en-IN")
                        : ""}
                    </p>

                  </div>

                  {/* Mark as Read */}
                  {!notification.isRead && (
                    <button
                      onClick={() =>
                        handleMarkAsRead(
                          notification._id
                        )
                      }
                      className="w-fit rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Mark as Read
                    </button>
                  )}

                </div>

                {/* Notification Type */}
                <div className="mt-4">

                  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                    {notification.type || "general"}
                  </span>

                  {!notification.isRead && (
                    <span className="ml-2 text-xs font-medium text-blue-600">
                      Unread
                    </span>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
};

export default DoctorNotifications;
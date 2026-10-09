import { useEffect, useState } from "react";
import api from "../../services/api";

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET NOTIFICATIONS
  // =====================================================

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/notifications");

      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error("Fetch notifications error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load notifications"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD NOTIFICATIONS
  // =====================================================

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =====================================================
  // MARK AS READ
  // =====================================================

  const handleMarkAsRead = async (notificationId) => {
    try {
      setError("");

      await api.put(
        `/notifications/${notificationId}/read`
      );

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Mark notification as read error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to mark notification as read"
      );
    }
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "Unknown date";
    }

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // =====================================================
  // GET UNREAD COUNT
  // =====================================================

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // =====================================================
  // NOTIFICATION TYPE STYLE
  // =====================================================

  const getTypeClass = (type) => {
    switch (type) {
      case "appointment":
        return "bg-blue-100 text-blue-700";

      case "prescription":
        return "bg-green-100 text-green-700";

      case "report":
        return "bg-purple-100 text-purple-700";

      case "reminder":
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
      <div className="mx-auto max-w-5xl">

        {/* PAGE HEADER */}

        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Notifications
            </h1>

            <p className="mt-2 text-gray-500">
              Stay updated with your appointments and health
              related activities.
            </p>
          </div>

          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {unreadCount} unread
          </div>
        </div>

        {/* SUCCESS MESSAGE */}

        {success && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
            {success}
          </div>
        )}

        {/* ERROR MESSAGE */}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* NOTIFICATIONS CARD */}

        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              My Notifications
            </h2>

            <button
              onClick={fetchNotifications}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              Refresh
            </button>
          </div>

          {/* LOADING */}

          {loading && (
            <div className="py-10 text-center text-gray-500">
              Loading notifications...
            </div>
          )}

          {/* EMPTY */}

          {!loading && notifications.length === 0 && (
            <div className="rounded-lg bg-gray-50 py-12 text-center">
              <div className="text-4xl">🔔</div>

              <p className="mt-4 text-gray-500">
                No notifications found.
              </p>

              <p className="mt-2 text-sm text-gray-400">
                You will see appointment and health-related
                updates here.
              </p>
            </div>
          )}

          {/* NOTIFICATION LIST */}

          {!loading && notifications.length > 0 && (
            <div className="space-y-4">

              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`rounded-xl border p-5 transition ${
                    notification.isRead
                      ? "border-gray-200 bg-white"
                      : "border-blue-200 bg-blue-50"
                  }`}
                >

                  <div className="flex flex-col justify-between gap-4 sm:flex-row">

                    {/* CONTENT */}

                    <div className="flex gap-4">

                      {/* ICON */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                        🔔
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="font-semibold text-gray-800">
                            {notification.title}
                          </h3>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getTypeClass(
                              notification.type
                            )}`}
                          >
                            {notification.type || "general"}
                          </span>

                          {!notification.isRead && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                              New
                            </span>
                          )}

                        </div>

                        <p className="mt-2 text-sm text-gray-600">
                          {notification.message}
                        </p>

                        <p className="mt-2 text-xs text-gray-400">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* MARK AS READ */}

                    {!notification.isRead && (
                      <div className="sm:self-center">
                        <button
                          onClick={() =>
                            handleMarkAsRead(
                              notification._id
                            )
                          }
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Mark as Read
                        </button>
                      </div>
                    )}

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

export default PatientNotifications;
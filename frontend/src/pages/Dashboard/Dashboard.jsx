import { useState, useEffect } from "react";
import {
  CalendarCheck,
  DollarSign,
  Users,
  Plus,
  Clock,
  Trash2,
  CalendarClock,
  CheckCircle,
  XCircle,
  Inbox,
  CalendarIcon,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import { getStatusBadge } from "./Helpers";
import { useAuth } from "../../context/AuthContext";
import { bookingApi } from "../../api/booking.api";

const Dashboard = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [recentBookings, setRecentBookings] = useState([]);

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  // Filter bookings based on search term and status
  const filteredBookings = recentBookings.filter((booking) => {
    const matchesStatus =
      statusFilter === "All" ||
      booking.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesStatus;
  });

  // Calculate counts for status badges
  const pendingCount = recentBookings.filter(
    (b) => b.status === "pending",
  ).length;
  const confirmedCount = recentBookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const cancelledCount = recentBookings.filter(
    (b) => b.status === "cancelled",
  ).length;
  const bookingsCount = recentBookings.length;

  // Quick stats data
  const stats = [
    {
      title: "Total Bookings",
      value: bookingsCount,
      icon: CalendarCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Monthly Revenue",
      value: "4,500 MAD",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Active Clients",
      value: "84",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: CalendarClock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Confirmed",
      value: confirmedCount,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Cancelled",
      value: cancelledCount,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  // Fetch recent bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookingApi.getAll();
        const apiBookings = response.data?.bookings;

        const formattedBookings = apiBookings.map((b) => {
          // Handle both possible structures for service data
          const serviceObj = b.categ_service || b.categService || {};

          // Safely parse date and time, providing defaults if missing
          const dateTimeParts = b.booking_time
            ? b.booking_time.split(" ") : ["N/A", "00:00"];
          const datePart = dateTimeParts[0];
          const timePart = dateTimeParts[1]
            ? dateTimeParts[1].substring(0, 5)
            : "00:00";

          return {
            id: b.id,
            displayId: `#BK-${String(b.id).padStart(3, "0")}`,
            client: b.client_name,
            phone: b.client_phone || "00 00 00 00 00",
            service: serviceObj.name,
            date: datePart,
            time: timePart,
            status: b.status || "pending",
            amount: `${Number(serviceObj.price)} MAD`,
          };
        });

        setRecentBookings(formattedBookings);
      } catch {
        toast.error("Failed to load bookings from server.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Update booking status (approve/cancel)
  const updateBookingStatus = async (id, newStatus) => {
    toast.loading("Updating status...");

    try {
      const response = await bookingApi.updateStatus(id, newStatus);
      setRecentBookings((prevBookings) =>
        prevBookings.map((b) =>
          b.id === id ? { ...b, status: newStatus } : b,
        ),
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update booking status.",
      );
    }
  };

  // const handleDeleteBooking = (id) => {};

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full p-2 sm:p-4">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {greeting}, {user?.name.split(" ")[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-gray-500 font-medium">
            Here is what's happening with your business today.
          </p>
        </div>

        {/* New Booking Button */}
        <button className="hover:cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-sm">
          <Plus className="h-4 w-4" />
          New Booking
        </button>
      </div>

      {/* 2. Statistics Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100 group"
            >
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div
                    className={`shrink-0 rounded-xl p-3 ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-500 mb-1">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Recent Bookings Table Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Latest 5 Bookings
            </h3>
            <p className="text-sm text-gray-500 font-medium mt-1">
              Manage your most recent client appointments and their statuses.
            </p>
          </div>

          {/* Filters Tabs */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="hover:cursor-pointer px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {isLoading ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">
              Fetching your bookings...
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          /* EMPTY STATE */
          <div className="p-12 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No bookings found
            </h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          /* TABLE DATA */
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Client
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Date & Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    {/* Client Column with Avatar */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200">
                          {booking.client.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {booking.client}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.id}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Phone Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">
                      <a
                        href={`https://wa.me/${booking.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline transition-colors"
                      >
                        {booking.phone}
                      </a>
                    </td>

                    {/* Service Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {booking.service}
                    </td>

                    {/* Date & Time */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center text-sm text-gray-700">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                          {booking.date}
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                          {booking.time}
                        </div>
                      </div>
                    </td>

                    {/* Amount Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {booking.amount}
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getStatusBadge(booking.status)}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-1 transition-opacity duration-200">
                        {booking.status === "Pending" && (
                          <div className="flex items-center justify-end gap-2 text-gray-400">
                            <button
                              onClick={() =>
                                updateBookingStatus(booking.id, "cancelled")
                              }
                              className="hover:cursor-pointer flex items-center justify-center h-8 w-8 rounded-lg hover:text-red-600 hover:bg-red-100 transition-colors"
                              title="Cancel Booking"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() =>
                                updateBookingStatus(booking.id, "confirmed")
                              }
                              className="hover:cursor-pointer flex items-center justify-center h-8 w-8 rounded-lg hover:text-emerald-600 hover:bg-emerald-100 transition-colors"
                              title="Approve Booking"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>{" "}
                        {/* Separator */}
                        <button
                          className="hover:cursor-pointer text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

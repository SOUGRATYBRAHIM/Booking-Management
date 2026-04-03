import { useState } from "react";
import {
  Clock,
  Users,
  Ban,
  Plus,
  Trash2,
  Save,
  Calendar as CalendarIcon,
} from "lucide-react";
import toast from "react-hot-toast";


const Calendar = () => {
  // Mocked state
  const [capacity, setCapacity] = useState(10);
  const [blockedDates, setBlockedDates] = useState([
    "2026-04-10",
    "2026-04-11",
  ]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);

  // Weekly Schedule State
  const [weeklyHours, setWeeklyHours] = useState([
    { day: "Monday", isOpen: true, open: "09:00", close: "18:00" },
    { day: "Tuesday", isOpen: true, open: "09:00", close: "18:00" },
    { day: "Wednesday", isOpen: true, open: "09:00", close: "18:00" },
    { day: "Thursday", isOpen: true, open: "09:00", close: "18:00" },
    { day: "Friday", isOpen: true, open: "09:00", close: "12:00" },
    { day: "Saturday", isOpen: false, open: "10:00", close: "15:00" },
    { day: "Sunday", isOpen: false, open: "00:00", close: "00:00" },
  ]);

  // ================= HANDLERS =================
  const handleHourChange = (index, field, value) => {
    const newHours = [...weeklyHours];
    newHours[index][field] = value;
    setWeeklyHours(newHours);
  };

  // Senior Touch: Add blocked date with validation
  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    if (blockedDates.includes(newBlockedDate)) {
      toast.error("Date is already blocked!");
      return;
    }
    setBlockedDates([...blockedDates, newBlockedDate].sort());
    setNewBlockedDate("");
    toast.success("Day off added to calendar.");
  };

  const handleRemoveBlockedDate = (dateToRemove) => {
    setBlockedDates(blockedDates.filter((d) => d !== dateToRemove));
  };

  // Mock save function
  const handleSaveAvailability = async () => {
    setIsSavingAvailability(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Availability settings saved successfully!");
    } catch {
      toast.error("Failed to save settings.");
    } finally {
      setIsSavingAvailability(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-6 pb-20">
      {/* HEADER & ADD BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Calendar & Rules
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your working hours.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveAvailability}
          disabled={isSavingAvailability}
          className="hover:cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-70 shadow-md"
        >
          <Save className="h-5 w-5" />
          {isSavingAvailability ? "Saving..." : "Save All Settings"}
        </button>
      </div>

      {/* BLOCKED DATES */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Weekly Hours */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" /> Weekly Hours
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {weeklyHours.map((dayConfig, index) => (
                  <div
                    key={dayConfig.day}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100"
                  >
                    {/* Toggle & Day Name */}
                    <div className="flex items-center gap-4 w-40">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={dayConfig.isOpen}
                          onChange={(e) =>
                            handleHourChange(index, "isOpen", e.target.checked)
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                      <span
                        className={`text-sm font-bold ${dayConfig.isOpen ? "text-gray-900" : "text-gray-400"}`}
                      >
                        {dayConfig.day}
                      </span>
                    </div>

                    {/* Time Inputs */}
                    {dayConfig.isOpen ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="time"
                          value={dayConfig.open}
                          onChange={(e) =>
                            handleHourChange(index, "open", e.target.value)
                          }
                          className="hover:cursor-pointer px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <span className="text-gray-400 text-sm">to</span>
                        <input
                          type="time"
                          value={dayConfig.close}
                          onChange={(e) =>
                            handleHourChange(index, "close", e.target.value)
                          }
                          className="hover:cursor-pointer px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    ) : (
                      <span className="text-sm font-medium text-gray-400 bg-gray-100 px-4 py-1.5 rounded-lg">
                        Closed / Day Off
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Rules & Exceptions */}
          <div className="space-y-6">
            {/* Capacity Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-emerald-600" /> Daily Capacity
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Maximum number of clients you can accept per day.
              </p>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-24 px-4 py-2 border border-gray-200 rounded-lg text-lg font-bold text-center focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <span className="text-sm font-semibold text-gray-600">
                  clients / day
                </span>
              </div>
            </div>

            {/* Blocked Dates Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                <Ban className="h-5 w-5 text-red-600" /> Days Off (Vacations)
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Block specific dates so clients cannot book.
              </p>

              <div className="flex gap-2 mb-4">
                <input
                  type="date"
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"
                />
                <button
                  onClick={handleAddBlockedDate}
                  className="hover:cursor-pointer bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* List of blocked dates */}
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                {blockedDates.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-2">
                    No days off scheduled.
                  </p>
                ) : (
                  blockedDates.map((date) => (
                    <div
                      key={date}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg border border-gray-100"
                    >
                      <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <CalendarIcon className="h-3.5 w-3.5 text-gray-400" />{" "}
                        {date}
                      </span>
                      <button
                        onClick={() => handleRemoveBlockedDate(date)}
                        className="hover:cursor-pointer text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Calendar;

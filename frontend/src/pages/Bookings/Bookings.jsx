import { useState } from "react";
import {
  Clock,
  DollarSign,
  Briefcase,
  UserPlus,
  Phone,
  Inbox,
  Search,
  Calendar as CalendarIcon,
} from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../../components/ui/Modal";

const Bookings = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualBooking, setManualBooking] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
  });

  // Mock manual booking submission
  const handleManualSubmit = (e) => {
    e.preventDefault();

    toast.success(`${manualBooking.name} has been booked successfully!`);
    setIsManualModalOpen(false);
    setManualBooking({
      name: "",
      phone: "",
      price: "",
      service: "",
      date: "",
      time: "",
    });
  };

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto w-full space-y-6 pb-20">
      {/* HEADER & ADD BUTTON */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            Bookings Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your client appointments.
          </p>
        </div>

        <div className="flex justify-end pt-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full sm:w-52 h-12 pl-10 pr-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all shadow-sm"
            />
          </div>

          {/* Add Manual Booking Button */}
          <button
            onClick={() => setIsManualModalOpen(true)}
            className="hover:cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add Manual Booking
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Inbox className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          No Bookings Yet
        </h3>
        <p className="text-sm text-gray-500 max-w-md">
          You don't have any bookings scheduled at the moment.
        </p>
      </div>

      {/* MANUAL BOOKING MODAL */}
      <Modal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
        title="Add Manual Booking"
      >
        <form className="space-y-4" onSubmit={handleManualSubmit}>
          <div className="bg-blue-50 p-3 rounded-lg flex gap-3 border border-blue-100 mb-4">
            <p className="text-sm text-blue-800">
              Add a client who called you directly. This will reduce your daily
              capacity automatically.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Name
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                required
                type="text"
                value={manualBooking.name}
                onChange={(e) =>
                  setManualBooking({ ...manualBooking, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                required
                type="tel"
                value={manualBooking.phone}
                onChange={(e) =>
                  setManualBooking({ ...manualBooking, phone: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="06..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                required
                type="text"
                value={manualBooking.price}
                onChange={(e) =>
                  setManualBooking({ ...manualBooking, price: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                required
                type="text"
                value={manualBooking.service}
                onChange={(e) =>
                  setManualBooking({
                    ...manualBooking,
                    service: e.target.value,
                  })
                }
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="..."
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  required
                  type="date"
                  value={manualBooking.date}
                  onChange={(e) =>
                    setManualBooking({ ...manualBooking, date: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  required
                  type="time"
                  value={manualBooking.time}
                  onChange={(e) =>
                    setManualBooking({ ...manualBooking, time: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="hover:cursor-pointer w-full mt-6 py-3 px-4 text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-all bg-blue-600"
          >
            Confirm & Save Booking
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Bookings;

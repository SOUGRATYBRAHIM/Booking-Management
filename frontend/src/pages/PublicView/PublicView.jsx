import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, Calendar as CalendarIcon, User, Phone, 
  CheckCircle, Loader2, Scissors, AlertTriangle 
} from 'lucide-react';
import toast from 'react-hot-toast';

import { pageApi } from '../../api/page.api';
import { serviceApi } from '../../api/service.api';
import { bookingApi } from '../../api/booking.api';
import Modal from '../../components/ui/Modal';

const PublicView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // ================= 1. STATES =================
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [services, setServices] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Booking Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // ================= 2. FETCH DATA =================
  useEffect(() => {
    const fetchPublicPage = async () => {
      try {
        // 1. Njibou l'Page b l'Slug
        const pageRes = await pageApi.getPublicPage(slug);
        const pageData = pageRes.data?.page;
        
        setPage(pageData);
        setSections(pageData.content || []);

        // 2. Njibou l'Services (Ila kant l'page mrbo6a b Category njibou ghir dyalha, sinon njibou kolchi)
        if (pageData.category_id) {
          const catRes = await serviceApi.getServicesByCategory(pageData.category_id);
          setServices(catRes.data?.services || []);
        } else {
          const allRes = await serviceApi.getAll();
          setServices(allRes.data?.services || []);
        }

      } catch (err) {
        setError(true); // Ila rej3at 404 mn Laravel (Page not found awla Draft)
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicPage();
  }, [slug]);

  // ================= 3. BOOKING HANDLERS =================
  const openBookingModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 🎯 N-formatiw l'Data 3la 7ssab l'Base d Données d Laravel
      const payload = {
        categ_service_id: selectedService.id,
        client_name: bookingData.name,
        client_phone: bookingData.phone,
        // Laravel kay-tsnna dateTime f "booking_time"
        booking_time: `${bookingData.date} ${bookingData.time}:00`, 
      };

      await bookingApi.submitBooking(slug, payload);
      
      setIsSuccess(true);
      // N-khwiw l'Form
      setBookingData({ name: '', phone: '', date: '', time: '' });
      
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= 4. ERROR & LOADING STATES =================
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="h-10 w-10 text-blue-600 animate-spin" /></div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
        <AlertTriangle className="h-16 w-16 text-red-400 mb-4" />
        <h1 className="text-3xl font-black text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-500 mb-6">The booking page you are looking for does not exist or is not published yet.</p>
      </div>
    );
  }

  // ================= 5. RENDER DYNAMIC PAGE =================
  return (
    <div className="min-h-screen bg-white">
      
      {/* 🎯 N-LOUPIW 3LA L'JSON LI SAWBE L'USER F L'BUILDER */}
      {sections.map((section) => (
        <div key={section.id}>
          
          {/* HERO SECTION */}
          {section.type === 'hero' && (
            <div className={`py-24 px-6 sm:px-10 text-center ${section.settings.bgColor || 'bg-white'}`}>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 tracking-tight">
                  {section.settings.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                  {section.settings.subtitle}
                </p>
                <button 
                  onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:cursor-pointer bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                  View Services & Book
                </button>
              </div>
            </div>
          )}

          {/* SERVICES SECTION */}
          {section.type === 'services' && (
            <div id="services-section" className="py-20 px-6 sm:px-10 bg-gray-50 border-t border-gray-100">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">{section.settings.title}</h2>
                  <p className="text-gray-500 text-lg">{section.settings.description}</p>
                </div>

                {services.length === 0 ? (
                  <div className="text-center text-gray-400 p-10 bg-white rounded-3xl border border-dashed border-gray-200">
                    No services are currently available for booking.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((svc) => (
                      <div key={svc.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
                        <div>
                          <div className="flex justify-between items-start mb-4 gap-4">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">{svc.name}</h3>
                            <span className="shrink-0 font-black text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl text-sm border border-emerald-100">
                              {Number(svc.price)} MAD
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                            {svc.description}
                          </p>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center text-sm font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Clock className="h-4 w-4 mr-2" /> {svc.duration_minutes} min
                          </div>
                          <button 
                            onClick={() => openBookingModal(svc)}
                            className="hover:cursor-pointer bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl font-bold transition-colors"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      ))}

      {/* FOOTER */}
      <footer className="bg-white py-10 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-sm font-medium">Powered by <span className="font-bold text-gray-900">BookingSaaS</span></p>
      </footer>

      {/* ================= 6. BOOKING MODAL ================= */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setIsSuccess(false); }} title={isSuccess ? "Booking Confirmed!" : "Complete Your Booking"}>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">You're all set!</h3>
            <p className="text-gray-500 mb-8">Your booking request has been sent to the provider. They will review it shortly.</p>
            <button onClick={() => { setIsModalOpen(false); setIsSuccess(false); }} className="hover:cursor-pointer w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-gray-800 transition-colors">
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-5">
            
            {/* Service Summary */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center mb-6">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Selected Service</p>
                <p className="text-sm font-bold text-gray-900">{selectedService?.name}</p>
              </div>
              <div className="text-right">
                <span className="font-black text-emerald-700 block">{Number(selectedService?.price)} MAD</span>
                <span className="text-xs text-gray-500 font-medium">{selectedService?.duration_minutes} min</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input required type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} min={new Date().toISOString().split('T')[0]} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input required type="time" value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required type="text" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} placeholder="e.g. Karim Alaoui" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input required type="tel" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} placeholder="06 XX XX XX XX" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="hover:cursor-pointer w-full mt-4 flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-all disabled:opacity-70">
              {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Confirm Booking'}
            </button>
          </form>
        )}
      </Modal>

    </div>
  );
};

export default PublicView;
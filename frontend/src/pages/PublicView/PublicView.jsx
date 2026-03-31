import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

import { ModernTemplate, ClassicTemplate, MinimalTemplate } from '../Builder/templates/index';
import { LoadingSpinner, NotFound, Modal } from '../../components/ui';

const PublicView = () => {
    const { slug } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Simulate API call to fetch website data based on slug
        const fetchWebsiteData = async () => {
            try {
                setLoading(true);

                setTimeout(() => {
                    if (slug === 'ali-barber') {
                        setData({
                            templateId: 'minimal',
                            content: { businessName: 'Ali Barber Shop', tagline: 'Best fades in town', description: 'Book your fresh cut today.', heroImage: 'https://images.unsplash.com/photo-1521590832167-7bfcbaa6362d?w=800', logoUrl: '' },
                            theme: { primaryColor: '#2563eb', fontFamily: 'font-sans', borderRadius: 'rounded-lg' },
                            settings: { whatsapp: '2126000000', instagram: '', seoTitle: 'Ali Barber' }
                        });
                    } else {
                        setError('Page not found');
                    }
                    setLoading(false);
                }, 1000);

            } catch {
                setError('Failed to load page');
                setLoading(false);
            }
        };

        fetchWebsiteData();
    }, [slug]);

    const handleOpenBooking = () => setIsModalOpen(true);

    if (loading) return <LoadingSpinner size='lg' fullScreen={true} variant='gray' label='Loading Page...' />;

    if (error || !data) return <NotFound message={`The page "${slug}" doesn't exist or was removed.`} />;

    return (
        <div className="relative min-h-screen">
            <div onClick={(e) => {
                if (e.target.tagName === 'BUTTON' && e.target.innerText.toLowerCase().includes('book')) {
                    handleOpenBooking();
                }
            }}>
                {data.templateId === 'modern' && <ModernTemplate data={data} />}
                {data.templateId === 'classic' && <ClassicTemplate data={data} />}
                {data.templateId === 'minimal' && <MinimalTemplate data={data} />}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Book an Appointment"
            >
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Booking requested successfully!'); setIsModalOpen(false); }}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input required type="text" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input required type="tel" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="+212 6..." />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input required type="date" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <input required type="time" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="hover:cursor-pointer w-full mt-6 py-3 px-4 text-white font-bold rounded-lg shadow-md hover:opacity-90 transition-all" style={{ backgroundColor: data.theme.primaryColor }}>
                        Confirm Booking
                    </button>
                </form>
            </Modal>

        </div>
    );
};

export default PublicView;
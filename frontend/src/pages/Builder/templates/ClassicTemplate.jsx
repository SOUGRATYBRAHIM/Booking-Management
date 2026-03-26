import { Phone } from 'lucide-react';

const ClassicTemplate = ({ data }) => {
  const { content, theme, settings } = data;

  return (
    <div className={`min-h-full bg-[#fafafa] flex flex-col ${theme.fontFamily}`}>
      
      {/* HEADER (Navbar) */}
      <header className="px-8 py-5 flex justify-between items-center border-b border-gray-200 bg-white shadow-sm z-10">
        {content.logoUrl ? (
          <img src={content.logoUrl} className="h-12 object-contain" alt="Logo" />
        ) : (
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: theme.primaryColor }}>
            {content.businessName}
          </h2>
        )}
        
        {settings.whatsapp && (
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:opacity-70 transition-opacity" style={{ color: theme.primaryColor }}>
            <Phone className="h-4 w-4" /> Contact
          </a>
        )}
      </header>

      {/* HERO SECTION */}
      <div className="flex flex-col lg:flex-row flex-1">
        
        {/* Left: Text Content */}
        <div className="flex-1 p-10 lg:p-16 flex flex-col justify-center">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            {content.businessName}
          </h1>
          <h3 className="text-2xl text-gray-600 mb-8 font-medium border-l-4 pl-4" style={{ borderColor: theme.primaryColor }}>
            {content.tagline}
          </h3>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed max-w-xl">
            {content.description}
          </p>
          
          <button 
            style={{ backgroundColor: theme.primaryColor }} 
            className={`w-fit px-10 py-4 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg ${theme.borderRadius}`}
          >
            Book Appointment
          </button>
        </div>
        
        {/* Right: Image */}
        <div className="flex-1 bg-gray-200 min-h-[400px] lg:min-h-full relative overflow-hidden">
          <img 
            src={content.heroImage || 'https://images.unsplash.com/photo-1521590832167-7bfcbaa6362d?w=800&q=80'} 
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>

      </div>
    </div>
  );
};

export default ClassicTemplate;
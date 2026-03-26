import { Phone, Instagram } from 'lucide-react';

const MinimalTemplate = ({ data }) => {
  const { content, theme, settings } = data;

  return (
    <div className={`min-h-full bg-white flex flex-col items-center justify-center p-10 text-center ${theme.fontFamily}`}>
      
      {/* Logo */}
      {content.logoUrl && (
        <img 
          src={content.logoUrl} 
          className="w-24 h-24 mb-10 object-contain grayscale hover:grayscale-0 transition-all duration-500" 
          alt="Logo" 
        />
      )}
      
      {/* Typography Focus */}
      <h1 className="text-5xl sm:text-7xl tracking-[0.2em] uppercase font-light text-gray-900 mb-6">
        {content.businessName}
      </h1>
      
      {/* Decorative Line */}
      <div className="w-20 h-1 mx-auto mb-10" style={{ backgroundColor: theme.primaryColor }}></div>
      
      <h3 className="text-xl sm:text-2xl text-gray-500 mb-12 tracking-wide font-light">
        {content.tagline}
      </h3>
      
      <p className="max-w-2xl mx-auto text-gray-400 mb-16 text-lg leading-loose font-light">
        {content.description}
      </p>
      
      <button 
        style={{ backgroundColor: theme.primaryColor, color: '#fff' }} 
        className={`px-14 py-5 text-sm tracking-[0.2em] uppercase font-semibold hover:opacity-80 transition-opacity ${theme.borderRadius}`}
      >
        Book Now
      </button>

      {/* Social Links */}
      <div className="mt-20 flex gap-6 text-gray-300">
        {settings.whatsapp && (
          <a href={`https://wa.me/${settings.whatsapp}`} className="hover:text-gray-900 transition-colors">
            <Phone className="h-6 w-6" />
          </a>
        )}
        {settings.instagram && (
          <a href={settings.instagram} className="hover:text-gray-900 transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
        )}
      </div>

    </div>
  );
};

export default MinimalTemplate;
import { Phone } from 'lucide-react';

const ModernTemplate = ({ data }) => {
  const { content, theme, settings } = data;

  return (
    <div className={`min-h-full bg-white flex flex-col ${theme.fontFamily}`}>

      {/* 1. HERO SECTION */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <img
          src={content.heroImage || 'https://images.unsplash.com/photo-1521590832167-7bfcbaa6362d?w=800&q=80'}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gray-900/60 flex flex-col items-center justify-center p-6 text-center">
          {content.logoUrl && (
            <img src={content.logoUrl} alt="Logo" className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow-lg" />
          )}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            {content.businessName}
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl">
            {content.tagline}
          </p>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-12 text-center">
        <p className="text-gray-600 text-lg leading-relaxed mb-10">
          {content.description}
        </p>

        <button
          style={{ backgroundColor: theme.primaryColor }}
          className={`px-10 py-4 text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg ${theme.borderRadius === 'rounded-full' ? 'rounded-full' : 'rounded-lg'}`}
        >
          Book
        </button>
      </div>

      {/* 3. FOOTER */}
      <div className="bg-gray-50 border-t border-gray-100 py-8 mt-auto">
        <div className="flex justify-center gap-6 text-gray-500">
          {settings.whatsapp && (
            <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="hover:text-green-500 transition-colors">
              <Phone className="h-6 w-6" />
            </a>
          )}
          <p className="text-sm">© {new Date().getFullYear()} {content.businessName}. All rights reserved.</p>
        </div>
      </div>

    </div>
  );
};

export default ModernTemplate;
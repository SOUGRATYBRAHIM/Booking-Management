import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';


const NotFound = ({ title = "404", message = "This page doesn't exist or was removed.", showHomeButton = true }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="h-24 w-24 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="h-12 w-12" />
      </div>
      <h1 className="text-6xl font-black text-gray-900 mb-4">{title}</h1>
      <p className="text-xl text-gray-600 font-medium max-w-md mb-8">{message}</p>
      
      {showHomeButton && (
        <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          <ArrowLeft className="h-4 w-4" /> Go back home
        </Link>
      )}
    </div>
  );
};

export default NotFound;
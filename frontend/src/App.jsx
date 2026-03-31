import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppRoutes from './routes/AppRoutes';
import { toastOptions } from './utils/toastConfig';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="bottom-right" toastOptions={toastOptions} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
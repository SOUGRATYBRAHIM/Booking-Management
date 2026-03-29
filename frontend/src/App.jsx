import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import AppRoutes from './routes/AppRoutes';
import { toastOptions } from './utils/toastConfig';


function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={toastOptions}
      />
    </BrowserRouter>
  );
}

export default App;
import { createContext, useContext, useState, useEffect } from 'react';

import { authApi } from '../api/auth.api';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkUserSession = async () => {
      try {
        const response = await authApi.getProfile();

        if (response.data.user) {
            setUser(response.data.user);
        } else {
            setUser(null);
        }

      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
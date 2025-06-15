import { createContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
} | null;

interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  token: string;
}

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (response: LoginResponse | string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userDataString = localStorage.getItem('userData');
          let userData: User = null;

          if (userDataString) {
            userData = JSON.parse(userDataString);
          }

          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = (response: LoginResponse | string) => {
    let token: string;
    let userData: User;

    if (typeof response === 'string') {
      token = response;
      userData = null;
    } else {
      token = response.token;
      userData = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email
      };
      localStorage.setItem('userData', JSON.stringify(response.user));
    }

    localStorage.setItem('authToken', token);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = useMemo(() => {
    return { user, isLoading, isAuthenticated, login, logout };
  }, [user, isLoading, isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
import { useState, useCallback } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

interface User {
  id: string;
  email: string;
  name: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface UseAuth {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AUTH_STORAGE_KEY = 'auth_state';

export function useAuth(): UseAuth {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authState, setAuthState] = useState<AuthState>(() => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return storedAuth
      ? JSON.parse(storedAuth)
      : { isAuthenticated: false, user: null, token: null };
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate an API call
      const response = await new Promise<{ user: User; token: string }>((resolve, reject) => {
        setTimeout(() => {
          if (credentials.email === 'test@example.com' && credentials.password === 'password') {
            resolve({
              user: {
                id: '1',
                email: credentials.email,
                name: 'Test User',
              },
              token: 'dummy_jwt_token',
            });
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });

      const newAuthState = {
        isAuthenticated: true,
        user: response.user,
        token: response.token,
      };

      setAuthState(newAuthState);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuthState));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null, token: null });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
    isLoading,
    error,
  };
}


import { useState, useEffect, createContext, useContext } from 'react';
import { AuthUser } from '@/types/registration';
import { verifyPassword, generateSessionToken, validateSessionToken, clearSession } from '@/lib/security';

interface AuthContextType {
  user: AuthUser | null;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  loginError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (validateSessionToken()) {
          const token = localStorage.getItem('admin_token');
          setUser({ token: token!, isAuthenticated: true });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (password: string): Promise<boolean> => {
    setLoginError(null);
    setIsLoading(true);
    
    try {
      const isValid = await verifyPassword(password);
      
      if (isValid) {
        const token = generateSessionToken();
        setUser({ token, isAuthenticated: true });
        return true;
      } else {
        setLoginError('كلمة المرور غير صحيحة');
        return false;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message.includes('locked')) {
        setLoginError('تم قفل الحساب بسبب محاولات تسجيل دخول فاشلة متكررة');
      } else {
        setLoginError('حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.');
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setLoginError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, loginError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

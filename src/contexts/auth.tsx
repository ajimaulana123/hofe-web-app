import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authService } from '@/lib/services/auth'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true
})

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthContextType>({
    isAuthenticated: false,
    user: null,
    loading: true
  })

  useEffect(() => {
    const token = authService.getStoredToken()
    if (token) {
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        loading: false
      }))
    } else {
      setState(prev => ({
        ...prev,
        loading: false
      }))
    }
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  businessId: string;
  businessName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (clinicName: string, email: string, password: string, firstName: string, lastName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load session from localStorage on mount
  useEffect(() => {
    async function loadSession() {
      try {
        const storedToken = localStorage.getItem("aedrea_session_token");
        if (!storedToken) {
          setLoading(false);
          return;
        }

        // Fetch user profile from Express backend using Bearer token
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData.success && resData.data) {
            setUser(resData.data);
            setToken(storedToken);
          } else {
            localStorage.removeItem("aedrea_session_token");
          }
        } else {
          localStorage.removeItem("aedrea_session_token");
        }
      } catch (err) {
        console.error("Failed to load session:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        return { success: false, error: resData.error?.message || "Sign in failed." };
      }

      const { session, user: profile } = resData.data;
      localStorage.setItem("aedrea_session_token", session.access_token);
      setToken(session.access_token);
      setUser(profile);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || "Network request failed." };
    }
  };

  const register = async (
    clinicName: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clinicName, email, password, firstName, lastName }),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        return { success: false, error: resData.error?.message || "Registration failed." };
      }

      const { session, user: profile } = resData.data;
      // SignUp might require email confirmation, if session is empty, return check email warning
      if (session) {
        localStorage.setItem("aedrea_session_token", session.access_token);
        setToken(session.access_token);
        setUser(profile);
      }
      return { success: true, error: session ? undefined : "Please check your email to verify your account." };
    } catch (err: any) {
      return { success: false, error: err.message || "Network request failed." };
    }
  };

  const logout = () => {
    localStorage.removeItem("aedrea_session_token");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

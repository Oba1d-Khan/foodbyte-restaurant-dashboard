"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface AuthContextType {
  user: { username: string; email: string; role: string } | null;
  isLoggedIn: boolean;
  login: (userData: { username: string; email: string; role: string }) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    username: string;
    email: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Only fetch profile if not on login/signup
    if (pathname === "/login" || pathname === "/signup") {
      setLoading(false);
      setUser(null);
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/profile", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.data) {
            setUser({
              username: data.data.username,
              email: data.data.email,
              role: data.data.role,
            });
            localStorage.setItem(
              "authUser",
              JSON.stringify({
                username: data.data.username,
                email: data.data.email,
                role: data.data.role,
              })
            );
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    })();
  }, [pathname]);

  const login = (userData: {
    username: string;
    email: string;
    role: string;
  }) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("cart"); // Clear cart on logout
    // Optionally, force a reload to clear UI
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: !!user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

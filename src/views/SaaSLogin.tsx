import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import SEO from "../components/SEO";

export default function SaaSLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login redirect to dashboard for now - fully integrated in Module 2
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <>
      <SEO title="Log In | Aedrea AI Receptionist" description="Access your receptionist dashboard." />
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 font-sans theme-enterprise-blue">
        <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 space-y-6 shadow-sm relative">
          <Link
            href="/"
            className="absolute top-4 right-4 text-muted-foreground/60 hover:text-foreground p-1.5 hover:bg-muted rounded-full transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </Link>
          <div className="space-y-2 text-center">
            <Link href="/" className="inline-block text-xl font-bold tracking-wider text-primary hover:text-blue-700">
              AEDREA
            </Link>
            <h2 className="text-lg font-semibold text-foreground">Sign in to your Portal</h2>
            <p className="text-xs text-muted-foreground">Enter clinic credentials below to manage your AI agent.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Clinic Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@clinic.com"
                className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:border-primary/50 outline-none placeholder-muted-foreground/40"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs text-muted-foreground font-medium">Password</label>
                <a href="/login/forgot" className="text-[10px] text-primary hover:text-blue-700 hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:border-primary/50 outline-none placeholder-muted-foreground/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:text-blue-700 hover:underline">
              Create free trial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

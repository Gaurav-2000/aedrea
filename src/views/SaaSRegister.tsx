import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import SEO from "../components/SEO";
import { useAuth } from "../contexts/AuthContext";

export default function SaaSRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();
  const { register } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    const result = await register(name, email, password, "Clinic", "Owner");
    setLoading(false);

    if (result.success) {
      if (result.error) {
        setSuccessMsg(result.error);
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.error || "Failed to create account.");
    }
  };

  return (
    <>
      <SEO title="Get Started | Aedrea AI Receptionist" description="Register a free trial for your clinic." />
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
            <h2 className="text-lg font-semibold text-foreground">Start your 14-day trial</h2>
            <p className="text-xs text-muted-foreground">Launch your AI Receptionist in less than 5 minutes.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-xs px-3.5 py-2.5 rounded-lg font-medium leading-normal text-center">
              ⚠️ {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-600 text-xs px-3.5 py-2.5 rounded-lg font-medium leading-normal text-center">
              ✉️ {successMsg}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Clinic Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dental Hub Clinic"
                className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:border-primary/50 outline-none placeholder-muted-foreground/40"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-muted-foreground font-medium">Account Owner Email</label>
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
              <label className="text-xs text-muted-foreground font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-background border border-border rounded-lg px-3.5 py-2 text-sm text-foreground focus:border-primary/50 outline-none placeholder-muted-foreground/40"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-primary-foreground font-semibold py-2.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              {loading ? "Creating workspace..." : "Create Account"}
            </button>
          </form>

          <div className="text-center text-xs text-muted-foreground pt-2 border-t border-border">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-blue-700 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

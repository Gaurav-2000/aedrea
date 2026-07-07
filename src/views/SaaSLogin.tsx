import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <Link href="/" className="inline-block text-xl font-bold tracking-wider text-orange-500 hover:text-orange-400">
              AEDREA
            </Link>
            <h2 className="text-lg font-semibold">Sign in to your Portal</h2>
            <p className="text-xs text-white/40">Enter clinic credentials below to manage your AI agent.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-white/50 font-medium">Clinic Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="doctor@clinic.com"
                className="w-full bg-black border border-[#1a1a24] rounded-lg px-3.5 py-2 text-sm text-white focus:border-white/10 outline-none placeholder-white/20"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs text-white/50 font-medium">Password</label>
                <a href="/login/forgot" className="text-[10px] text-orange-400 hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black border border-[#1a1a24] rounded-lg px-3.5 py-2 text-sm text-white focus:border-white/10 outline-none placeholder-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="text-center text-xs text-white/40 pt-2 border-t border-[#1a1a24]">
            Don't have an account?{" "}
            <Link href="/register" className="text-orange-400 hover:underline">
              Create free trial
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

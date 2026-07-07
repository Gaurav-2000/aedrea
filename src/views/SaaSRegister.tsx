import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SEO from "../components/SEO";

export default function SaaSRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock register and onboarding setup for now
    setTimeout(() => {
      setLoading(false);
      router.push("/dashboard");
    }, 800);
  };

  return (
    <>
      <SEO title="Get Started | Aedrea AI Receptionist" description="Register a free trial for your clinic." />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-sm bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <Link href="/" className="inline-block text-xl font-bold tracking-wider text-orange-500 hover:text-orange-400">
              AEDREA
            </Link>
            <h2 className="text-lg font-semibold">Start your 14-day trial</h2>
            <p className="text-xs text-white/40">Launch your AI Receptionist in less than 5 minutes.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-white/50 font-medium">Clinic Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dental Hub Clinic"
                className="w-full bg-black border border-[#1a1a24] rounded-lg px-3.5 py-2 text-sm text-white focus:border-white/10 outline-none placeholder-white/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-white/50 font-medium">Account Owner Email</label>
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
              <label className="text-xs text-white/50 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-black border border-[#1a1a24] rounded-lg px-3.5 py-2 text-sm text-white focus:border-white/10 outline-none placeholder-white/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-2.5 rounded-lg text-sm transition-all cursor-pointer"
            >
              {loading ? "Creating workspace..." : "Create Account"}
            </button>
          </form>

          <div className="text-center text-xs text-white/40 pt-2 border-t border-[#1a1a24]">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-400 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

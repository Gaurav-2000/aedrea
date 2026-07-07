import NavBar from "../components/NavBar";
import Footer from "../sections/Footer";
import SEO from "../components/SEO";

export default function SaaSPricing() {
  return (
    <>
      <SEO
        title="Pricing | Aedrea AI Receptionist"
        description="Flexible, usage-based subscription pricing plans for dental clinics and local businesses."
      />
      <NavBar />
      <main className="bg-black text-white min-h-screen pt-32 pb-20 font-sans">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Simple, Transparent Pricing</h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Get an AI receptionist configured for your dental clinic. Zero setup fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8 text-left mt-8">
            {/* Starter Plan */}
            <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-8 hover:border-orange-500/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Starter</h3>
                <p className="text-xs text-white/40 mt-1">Perfect for small, single-doctor clinics.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">₹4,999</span>
                  <span className="text-sm text-white/40 ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-white/70">
                  <li className="flex items-center gap-2">🟢 Web Chat & FAQ replies</li>
                  <li className="flex items-center gap-2">🟢 Integrated Booking Scheduler</li>
                  <li className="flex items-center gap-2">🟢 Up to 500 WhatsApp Messages/mo</li>
                  <li className="flex items-center gap-2">🔴 AI Voice / Phone calls</li>
                </ul>
              </div>
              <a
                href="/register?plan=starter"
                className="mt-8 block text-center bg-white/10 hover:bg-white/15 text-white font-semibold py-2.5 rounded-lg text-sm border border-white/5 transition-all"
              >
                Start 14-day Free Trial
              </a>
            </div>

            {/* Growth / Pro Plan */}
            <div className="bg-[#0d0d12] border border-orange-500/20 rounded-2xl p-8 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between relative">
              <span className="absolute -top-3 right-6 bg-orange-500 text-black text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Recommended
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Professional</h3>
                <p className="text-xs text-white/40 mt-1">For busy, multi-chair clinic operations.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">₹9,999</span>
                  <span className="text-sm text-white/40 ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-white/70">
                  <li className="flex items-center gap-2">🟢 Everything in Starter</li>
                  <li className="flex items-center gap-2">🟢 AI Voice calling assistant (incoming)</li>
                  <li className="flex items-center gap-2">🟢 Custom RAG Knowledge Base rules</li>
                  <li className="flex items-center gap-2">🟢 Unlimited WhatsApp templates</li>
                </ul>
              </div>
              <a
                href="/register?plan=professional"
                className="mt-8 block text-center bg-orange-500 hover:bg-orange-600 text-black font-bold py-2.5 rounded-lg text-sm transition-all"
              >
                Start 14-day Free Trial
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

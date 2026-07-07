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
      <main className="bg-background text-foreground min-h-screen pt-32 pb-20 font-sans theme-enterprise-blue">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Get an AI receptionist configured for your dental clinic. Zero setup fees, cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto gap-8 text-left mt-8">
            {/* Starter Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:border-primary/20 transition-all duration-300 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-foreground">Starter</h3>
                <p className="text-xs text-muted-foreground mt-1">Perfect for small, single-doctor clinics.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">₹4,999</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-foreground/70">
                  <li className="flex items-center gap-2">🟢 Web Chat & FAQ replies</li>
                  <li className="flex items-center gap-2">🟢 Integrated Booking Scheduler</li>
                  <li className="flex items-center gap-2">🟢 Up to 500 WhatsApp Messages/mo</li>
                  <li className="flex items-center gap-2">🔴 AI Voice / Phone calls</li>
                </ul>
              </div>
              <a
                href="/register?plan=starter"
                className="mt-8 block text-center bg-muted hover:bg-muted/80 text-foreground font-semibold py-2.5 rounded-lg text-sm border border-border transition-all"
              >
                Start 14-day Free Trial
              </a>
            </div>

            {/* Growth / Pro Plan */}
            <div className="bg-card border border-primary/20 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between relative shadow-md">
              <span className="absolute -top-3 right-6 bg-primary text-primary-foreground text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                Recommended
              </span>
              <div>
                <h3 className="text-lg font-bold text-foreground">Professional</h3>
                <p className="text-xs text-muted-foreground mt-1">For busy, multi-chair clinic operations.</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground">₹9,999</span>
                  <span className="text-sm text-muted-foreground ml-1">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-foreground/70">
                  <li className="flex items-center gap-2">🟢 Everything in Starter</li>
                  <li className="flex items-center gap-2">🟢 AI Voice calling assistant (incoming)</li>
                  <li className="flex items-center gap-2">🟢 Custom RAG Knowledge Base rules</li>
                  <li className="flex items-center gap-2">🟢 Unlimited WhatsApp templates</li>
                </ul>
              </div>
              <a
                href="/register?plan=professional"
                className="mt-8 block text-center bg-primary hover:bg-hover text-primary-foreground font-bold py-2.5 rounded-lg text-sm transition-all"
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

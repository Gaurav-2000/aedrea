import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-sm font-semibold mb-1">Invoices & Razorpay Billing</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 13 — Billing & Payments will generate treatment invoices, download PDF statements, and process online payment links here.
        </p>
      </div>
    </div>
  );
}

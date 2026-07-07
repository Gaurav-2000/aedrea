import { Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-sm font-semibold mb-1">Super Admin Panel</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 16 — Super Admin will control global platform configurations, coupon releases, platform performance analytics, and tenant management.
        </p>
      </div>
    </div>
  );
}

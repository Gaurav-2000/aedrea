import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-sm font-semibold mb-1">Clinic Analytics & Performance</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 14 — Reports will generate comprehensive revenue summaries, appointment counts, employee productivity charts, and AI call stats.
        </p>
      </div>
    </div>
  );
}

import { Plus } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 rounded-full font-semibold">Scheduled: 12</span>
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-3 py-1 rounded-full font-semibold">Completed: 42</span>
        </div>
        <button className="bg-primary hover:bg-hover text-primary-foreground font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4 animate-bounce">
          ⌛
        </div>
        <h4 className="text-sm font-semibold mb-1">Appointments Dashboard</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 9 — Appointment Bookings and conflict detection scheduler. Supports automated reminders, Waitlists and recurring checkup rules.
        </p>
      </div>
    </div>
  );
}

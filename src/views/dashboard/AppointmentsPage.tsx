import { Plus } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs px-3 py-1 rounded-full font-semibold">Scheduled: 12</span>
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-3 py-1 rounded-full font-semibold">Completed: 42</span>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Book Appointment
        </button>
      </div>

      <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4 animate-bounce">
          ⌛
        </div>
        <h4 className="text-sm font-semibold mb-1">Appointments Dashboard</h4>
        <p className="text-xs text-white/40 text-center max-w-sm">
          Module 9 — Appointment Bookings and conflict detection scheduler. Supports automated reminders, Waitlists and recurring checkup rules.
        </p>
      </div>
    </div>
  );
}

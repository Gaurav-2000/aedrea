import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-[#0d0d12] border border-[#1a1a24] p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-5 h-5 text-orange-400" />
          <h3 className="text-sm font-bold">July 2026</h3>
          <div className="flex border border-white/5 rounded-lg overflow-hidden bg-white/5">
            <button className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-white/5 text-white/60 hover:text-white cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex border border-white/5 rounded-lg overflow-hidden bg-white/5 p-0.5 text-xs font-semibold">
          {["Day", "Week", "Month"].map((mode) => (
            <button
              key={mode}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${mode === "Week" ? "bg-white/10 text-white" : "text-white/40 hover:text-white/80"}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Placeholder */}
      <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4 animate-pulse">
          📅
        </div>
        <h4 className="text-sm font-semibold mb-1">Calendar Workspace</h4>
        <p className="text-xs text-white/40 text-center max-w-sm">
          Module 8 — Calendar Drag & Drop scheduling dashboard loading skeleton. Includes employee tracking and shift scheduling features.
        </p>
      </div>
    </div>
  );
}

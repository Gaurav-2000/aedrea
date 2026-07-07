import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex justify-between items-center bg-card border border-border p-4 rounded-xl">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-bold">July 2026</h3>
          <div className="flex border border-border rounded-lg overflow-hidden bg-muted">
            <button className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
            <button className="p-1.5 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex border border-border rounded-lg overflow-hidden bg-muted p-0.5 text-xs font-semibold">
          {["Day", "Week", "Month"].map((mode) => (
            <button
              key={mode}
              className={`px-3 py-1.5 rounded-md cursor-pointer ${mode === "Week" ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground/80"}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Placeholder */}
      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4 animate-pulse">
          📅
        </div>
        <h4 className="text-sm font-semibold mb-1">Calendar Workspace</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 8 — Calendar Drag & Drop scheduling dashboard loading skeleton. Includes employee tracking and shift scheduling features.
        </p>
      </div>
    </div>
  );
}

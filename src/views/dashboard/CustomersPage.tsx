import { Search, Filter, Plus, FileSpreadsheet } from "lucide-react";

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full bg-[#0d0d12] border border-[#1a1a24] rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:border-white/10 outline-none"
          />
        </div>
        <div className="flex gap-2.5 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none bg-white/5 border border-white/5 text-white/80 hover:text-white px-3.5 py-2 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex-1 sm:flex-none bg-white/5 border border-white/5 text-white/80 hover:text-white px-3.5 py-2 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer">
            <FileSpreadsheet className="w-4 h-4" /> Import/Export
          </button>
          <button className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 text-black font-semibold px-4 py-2 rounded-lg text-sm flex items-center justify-center gap-1.5 cursor-pointer">
            <Plus className="w-4.5 h-4.5" /> Add Customer
          </button>
        </div>
      </div>

      {/* Loading Skeleton Panel (Premium Look) */}
      <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl overflow-hidden animate-pulse">
        <div className="border-b border-[#1a1a24] px-6 py-4 bg-[#09090c] flex items-center justify-between">
          <div className="h-4 bg-white/10 rounded w-28" />
          <div className="h-4 bg-white/10 rounded w-16" />
        </div>
        <div className="p-6 space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5" />
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded w-36" />
                  <div className="h-3 bg-white/5 rounded w-24" />
                </div>
              </div>
              <div className="h-4 bg-white/10 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-white/20">Module 5 — Customer Management will load full table components here.</p>
    </div>
  );
}

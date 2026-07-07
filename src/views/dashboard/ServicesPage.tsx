import { Plus, Tag } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-white/50">Configure treatments & price lists</h3>
        <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4">
          <Tag className="w-5 h-5 text-orange-400" />
        </div>
        <h4 className="text-sm font-semibold mb-1">Services Catalogue</h4>
        <p className="text-xs text-white/40 text-center max-w-sm">
          Module 6 — Services CRUD will list categorised dental treatments, prices, durations, and VAT rates here.
        </p>
      </div>
    </div>
  );
}

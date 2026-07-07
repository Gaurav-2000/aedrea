import { MessageSquare } from "lucide-react";

export default function WhatsAppPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-4">
          <MessageSquare className="w-5 h-5 text-orange-400" />
        </div>
        <h4 className="text-sm font-semibold mb-1">WhatsApp AI Conversations</h4>
        <p className="text-xs text-white/40 text-center max-w-sm">
          Module 12 — WhatsApp Integration will configure chatbot templates, direct client messages, and marketing broadcasts.
        </p>
      </div>
    </div>
  );
}

import { PhoneCall } from "lucide-react";

export default function CallsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground mb-4">
          <PhoneCall className="w-5 h-5 text-primary" />
        </div>
        <h4 className="text-sm font-semibold mb-1">AI Call Transcripts & Logs</h4>
        <p className="text-xs text-muted-foreground text-center max-w-sm">
          Module 18 — Voice Integration will list phone recordings, summaries, action tags, and agent speech-to-text transcripts here.
        </p>
      </div>
    </div>
  );
}

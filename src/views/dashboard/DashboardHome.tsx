import { Phone, Calendar, IndianRupee, ShieldAlert, Sparkles } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
}

function MetricCard({ title, value, change, isPositive, icon: Icon, iconBg, iconColor }: MetricCardProps) {
  return (
    <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-5 hover:border-white/10 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-white/50">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight mt-1.5">{value}</h3>
        </div>
        <div className={`p-2.5 rounded-lg ${iconBg} ${iconColor}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-4">
        <span className={`text-xs font-semibold ${isPositive ? "text-green-400" : "text-red-400"}`}>
          {change}
        </span>
        <span className="text-[10px] text-white/30">vs yesterday</span>
      </div>
    </div>
  );
}

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
            Welcome back, Dental Hub <Sparkles className="w-5 h-5 text-orange-400 animate-pulse" />
          </h2>
          <p className="text-sm text-white/60 mt-1">
            Your AI receptionist is active and has handled 12 calls today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs px-4 py-2.5 rounded-lg transition-colors duration-200 cursor-pointer">
            View AI Logs
          </button>
          <button className="bg-white/5 hover:bg-white/10 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors border border-white/5 cursor-pointer">
            Settings
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Today's AI Calls"
          value="18"
          change="+12.5%"
          isPositive={true}
          icon={Phone}
          iconBg="bg-blue-500/10"
          iconColor="text-blue-400"
        />
        <MetricCard
          title="Appointments Scheduled"
          value="8"
          change="+20%"
          isPositive={true}
          icon={Calendar}
          iconBg="bg-green-500/10"
          iconColor="text-green-400"
        />
        <MetricCard
          title="Est. Revenue"
          value="₹14,500"
          change="+8.3%"
          isPositive={true}
          icon={IndianRupee}
          iconBg="bg-orange-500/10"
          iconColor="text-orange-400"
        />
        <MetricCard
          title="Missed/Transferred Calls"
          value="2"
          change="-50%"
          isPositive={true}
          icon={ShieldAlert}
          iconBg="bg-red-500/10"
          iconColor="text-red-400"
        />
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-6 lg:col-span-2">
          <h3 className="text-sm font-bold tracking-tight mb-4">Recent Bookings & Activity</h3>
          <div className="space-y-4">
            {[
              { name: "Rahul Sharma", action: "booked Root Canal treatment", time: "10 mins ago", method: "WhatsApp AI" },
              { name: "Pooja Gupta", action: "inquired about teeth whitening cost", time: "42 mins ago", method: "AI Call Bot" },
              { name: "Amit Kumar", action: "rescheduled checkup appointment", time: "2 hours ago", method: "Web Chat" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 bg-[#09090c] border border-white/5 rounded-lg text-sm">
                <div>
                  <span className="font-semibold text-white/90">{activity.name} </span>
                  <span className="text-white/50">{activity.action}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white/30">{activity.time}</p>
                  <span className="inline-block mt-1 text-[9px] bg-white/5 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/10">
                    {activity.method}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Health Widget */}
        <div className="bg-[#0d0d12] border border-[#1a1a24] rounded-xl p-6">
          <h3 className="text-sm font-bold tracking-tight mb-4">AI Receptionist Status</h3>
          <div className="space-y-5">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Status</span>
              <span className="text-green-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Active
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Current Model</span>
              <span className="text-white/80 font-medium">Gemini 1.5 Flash</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50">Accuracy Rate</span>
              <span className="text-white/80 font-medium">98.2%</span>
            </div>

            <div className="pt-4 border-t border-[#1a1a24] text-xs text-white/40 leading-relaxed">
              Your AI model has successfully referenced the <span className="text-orange-400">Knowledge Base</span> to answer FAQ queries, preventing 9 out of 10 incoming manual support calls.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

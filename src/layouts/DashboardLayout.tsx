import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  UserCheck,
  Briefcase,
  Phone,
  MessageSquare,
  BookOpen,
  Brain,
  BarChart3,
  CreditCard,
  Settings,
  Shield,
  Menu,
  X,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
}

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Calendar", path: "/dashboard/calendar", icon: Calendar },
  { name: "Appointments", path: "/dashboard/appointments", icon: Clock },
  { name: "Customers", path: "/dashboard/customers", icon: Users },
  { name: "Services", path: "/dashboard/services", icon: Briefcase },
  { name: "Employees", path: "/dashboard/employees", icon: UserCheck },
  { name: "Calls (Voice)", path: "/dashboard/calls", icon: Phone },
  { name: "WhatsApp", path: "/dashboard/whatsapp", icon: MessageSquare },
  { name: "Knowledge Base", path: "/dashboard/knowledge-base", icon: BookOpen },
  { name: "AI Receptionist", path: "/dashboard/ai", icon: Brain },
  { name: "Reports", path: "/dashboard/reports", icon: BarChart3 },
  { name: "Billing", path: "/dashboard/billing", icon: CreditCard },
  { name: "Subscription", path: "/dashboard/subscription", icon: Shield },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    // Will hook into Supabase SignOut in Module 2
    console.log("Logging out...");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-[#070709] text-white font-sans overflow-hidden">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0d0d12] border-r border-[#1a1a24] shrink-0">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-[#1a1a24] gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center font-bold text-black text-sm">
            Æ
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">AEDREA</h1>
            <p className="text-[10px] text-white/40">AI Receptionist Portal</p>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin">
          {sidebarItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-white/10 text-white shadow-sm border border-white/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-orange-400" : "text-white/40 group-hover:text-white/60"}`} />
                  <span>{item.name}</span>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-orange-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-[#1a1a24] bg-[#09090c] flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/20 flex items-center justify-center text-xs font-semibold shrink-0">
              DC
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold truncate">Dental Clinic</p>
              <p className="text-[10px] text-white/40 truncate">Dr. Gaurav</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md hover:bg-white/5 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-64 bg-[#0d0d12] flex flex-col border-r border-[#1a1a24] animate-fade-in-right">
            {/* Mobile Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-[#1a1a24]">
              <div className="flex items-center gap-2">
                <div className="w-7.5 h-7.5 rounded-lg bg-orange-500 flex items-center justify-center font-bold text-black text-xs">
                  Æ
                </div>
                <span className="text-sm font-bold">AEDREA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {sidebarItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-white/10 text-white border border-white/5"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom logout area */}
            <div className="p-4 border-t border-[#1a1a24] flex items-center justify-between">
              <span className="text-xs text-white/50">Dr. Gaurav (Owner)</span>
              <button onClick={handleLogout} className="text-red-400 text-xs flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main Panel ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <header className="h-16 bg-[#0d0d12] border-b border-[#1a1a24] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1 text-white/60 hover:text-white cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold tracking-tight capitalize">
              {location.pathname.split("/").pop() || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-all relative cursor-pointer">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
            </button>

            <div className="h-6 w-px bg-[#1a1a24] hidden sm:block" />

            {/* Tenant badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full text-xs font-semibold text-orange-400">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              Dental Hub (Active)
            </div>
          </div>
        </header>

        {/* Dynamic Route Outlet */}
        <main className="flex-1 overflow-y-auto bg-[#070709] p-6 lg:p-8 scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

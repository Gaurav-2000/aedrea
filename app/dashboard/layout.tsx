"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    // Will hook into Supabase SignOut in Module 2
    console.log("Logging out...");
  };

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden theme-enterprise-blue">
      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border shrink-0">
        {/* Brand Header */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center font-bold text-white text-sm">
            Æ
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-sidebar-foreground">AEDREA</h1>
            <p className="text-[10px] text-sidebar-foreground/40">AI Receptionist Portal</p>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin" data-lenis-prevent>
          {sidebarItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm border border-sidebar-border"
                    : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? "text-sidebar-primary" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/60"}`} />
                  <span>{item.name}</span>
                </div>
                {active && <ChevronRight className="w-3.5 h-3.5 text-sidebar-primary" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar-accent/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-primary/25 text-blue-200 border border-primary/20 flex items-center justify-center text-xs font-semibold shrink-0">
              DC
            </div>
            <div className="truncate text-sidebar-foreground">
              <p className="text-xs font-semibold truncate">Dental Clinic</p>
              <p className="text-[10px] text-sidebar-foreground/40 truncate">Dr. Gaurav</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/45 hover:text-red-400 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-64 bg-sidebar flex flex-col border-r border-sidebar-border animate-fade-in-right">
            {/* Mobile Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center font-bold text-white text-sm">
                  Æ
                </div>
                <span className="text-sm font-bold text-sidebar-foreground">AEDREA</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 text-sidebar-foreground/60 hover:text-sidebar-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1" data-lenis-prevent>
              {sidebarItems.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground border border-sidebar-border"
                        : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? "text-sidebar-primary" : "text-sidebar-foreground/40"}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom logout area */}
            <div className="p-4 border-t border-sidebar-border flex items-center justify-between">
              <span className="text-xs text-sidebar-foreground/50">Dr. Gaurav (Owner)</span>
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
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-base font-semibold tracking-tight capitalize text-foreground">
              {pathname.split("/").pop() || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-all relative cursor-pointer">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>

            <div className="h-6 w-px bg-border hidden sm:block" />

            {/* Tenant badge */}
            <div className="hidden sm:flex items-center gap-2 bg-primary/5 border border-primary/20 px-3 py-1.5 rounded-full text-xs font-semibold text-primary">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-ping" />
              Dental Hub (Active)
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto bg-background p-6 lg:p-8 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}

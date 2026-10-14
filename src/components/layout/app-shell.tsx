"use client";

import React, { useState } from "react";
import { AppSidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MobileDrawer, MobileBottomNav } from "./mobile-nav";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50/70 text-slate-900">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <AppSidebar className="fixed inset-y-0 z-40" />
      </div>

      {/* Main Column */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Navbar */}
        <Topbar onToggleMobileNav={() => setMobileDrawerOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 pb-24 lg:pb-12 max-w-7xl mx-auto w-full">
          {children}
        </main>

        {/* Mobile Navigation Bar & Drawer */}
        <MobileDrawer
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
        />
        <MobileBottomNav onOpenMenu={() => setMobileDrawerOpen(true)} />
      </div>
    </div>
  );
}

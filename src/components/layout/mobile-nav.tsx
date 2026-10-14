"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  MessageSquareQuote,
  MoreHorizontal,
  X,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./sidebar";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-bold text-slate-900">BMSCE Hub</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-slate-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AppSidebar onNavigate={onClose} className="border-r-0 w-full" />
        </div>
      </div>
    </div>
  );
}

export function MobileBottomNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();

  const primaryTabs = [
    { name: "Home", href: "/", icon: LayoutDashboard },
    { name: "Notes", href: "/notes", icon: BookOpen },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Q&A", href: "/qa", icon: MessageSquareQuote },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-slate-200 bg-white/95 px-2 backdrop-blur-md lg:hidden">
      {primaryTabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          tab.href === "/"
            ? pathname === "/"
            : pathname === tab.href || pathname?.startsWith(tab.href + "/");

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors",
              isActive
                ? "text-blue-900 font-bold"
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5 transition-transform",
                isActive ? "text-blue-900 scale-110" : "text-slate-400"
              )}
            />
            <span>{tab.name}</span>
          </Link>
        );
      })}

      {/* "More" trigger */}
      <button
        type="button"
        onClick={onOpenMenu}
        className="flex flex-col items-center justify-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-500 hover:text-slate-900"
      >
        <MoreHorizontal className="h-5 w-5 text-slate-400" />
        <span>More</span>
      </button>
    </nav>
  );
}

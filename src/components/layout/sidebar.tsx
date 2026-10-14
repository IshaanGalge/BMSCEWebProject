"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  UtensilsCrossed,
  MessageSquareQuote,
  ShoppingBag,
  Search,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_CURRENT_USER } from "@/lib/mock-data";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  highlight?: boolean;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Notes & Study Hub",
    href: "/notes",
    icon: BookOpen,
    badge: "280+",
  },
  {
    name: "Events & Clubs",
    href: "/events",
    icon: Calendar,
    badge: "Utsav '26",
    highlight: true,
  },
  {
    name: "Canteen & Places",
    href: "/canteen",
    icon: UtensilsCrossed,
    badge: "Live",
  },
  {
    name: "Ask a Senior Q&A",
    href: "/qa",
    icon: MessageSquareQuote,
    badge: "18 new",
  },
  {
    name: "Student Marketplace",
    href: "/marketplace",
    icon: ShoppingBag,
    badge: "Deals",
  },
  {
    name: "Lost & Found",
    href: "/lost-found",
    icon: Search,
    badge: "7 open",
  },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function AppSidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col justify-between border-r border-slate-200 bg-white shadow-2xs",
        className
      )}
    >
      {/* Top Header & Branding */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 text-white shadow-sm ring-2 ring-blue-800/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-tight text-base">
                BMSCE Hub
              </span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[11px] font-medium text-slate-500 tracking-wide">
              Autonomous • Estd. 1946
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-4">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Campus Portals
          </div>
          <nav className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname?.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-blue-900 text-white shadow-xs font-semibold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-blue-900"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <Badge
                      variant={
                        isActive
                          ? "secondary"
                          : item.highlight
                          ? "warning"
                          : "secondary"
                      }
                      className={cn(
                        "text-[10px] px-1.5 py-0 h-4.5",
                        isActive && "bg-white/20 text-white border-0"
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Quick Portal Links */}
        <div className="px-3 pt-2">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            External BMSCE Portals
          </div>
          <div className="space-y-1">
            <a
              href="https://bmsce.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <span>Contineo Student Portal</span>
              <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
            </a>
            <a
              href="https://bmsce.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <span>Central Library DSpace</span>
              <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-slate-600" />
            </a>
          </div>
        </div>
      </div>

      {/* User Footer Card */}
      <div className="border-t border-slate-100 p-3 m-2 rounded-xl bg-slate-50/80">
        <div className="flex items-center gap-3">
          <Avatar
            fallback={MOCK_CURRENT_USER.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            className="h-9 w-9 ring-1 ring-blue-900/10"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="truncate text-xs font-semibold text-slate-900">
              {MOCK_CURRENT_USER.full_name}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-mono text-blue-800 font-medium">
                {MOCK_CURRENT_USER.usn}
              </span>
              <span>•</span>
              <span>{MOCK_CURRENT_USER.branch}</span>
            </div>
          </div>
          <Sparkles className="h-4 w-4 text-amber-500" />
        </div>
      </div>
    </aside>
  );
}

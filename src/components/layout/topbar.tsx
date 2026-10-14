"use client";

import React, { useState } from "react";
import {
  Menu,
  Bell,
  Search as SearchIcon,
  CalendarDays,
  CheckCheck,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_CURRENT_USER, MOCK_NOTIFICATIONS } from "@/lib/mock-data";

interface TopbarProps {
  onToggleMobileNav?: () => void;
}

export function Topbar({ onToggleMobileNav }: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-md lg:px-8">
      {/* Left: Mobile hamburger & search */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleMobileNav}
          className="lg:hidden h-9 w-9 text-slate-700"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Global Search Input */}
        <div className="relative w-full max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search notes (e.g. 21CS52), events, canteen, questions..."
            className="h-9 pl-9 pr-4 text-xs md:text-sm bg-slate-50 border-slate-200 focus-visible:bg-white"
          />
        </div>
      </div>

      {/* Right: Semester status, notifications, and user */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Academic status pill (desktop) */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50/70 px-3 py-1 text-xs font-medium text-blue-900">
          <CalendarDays className="h-3.5 w-3.5 text-blue-700" />
          <span>Odd Sem 2026</span>
          <span className="text-blue-300">•</span>
          <span className="text-slate-600">CIE-2 Week</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative h-9 w-9 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            aria-label="View notifications"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600" />
              </span>
            )}
          </Button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in-50 zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Campus Alerts</span>
                  <Badge variant="secondary" className="text-[10px] h-4">
                    {unreadCount} unread
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-slate-400 hover:text-slate-700"
                  onClick={() => setShowNotifications(false)}
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="space-y-2 py-2 max-h-72 overflow-y-auto">
                {MOCK_NOTIFICATIONS.map((notif) => (
                  <div
                    key={notif.id}
                    className={`rounded-lg p-2.5 text-xs transition-colors ${
                      notif.read ? "bg-white" : "bg-blue-50/60"
                    } hover:bg-slate-50`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="font-semibold text-slate-900">
                        {notif.title}
                      </span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {notif.time_ago}
                      </span>
                    </div>
                    <p className="mt-1 text-slate-600 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-blue-900 font-medium cursor-pointer hover:underline">
                  <CheckCheck className="h-3 w-3" /> Mark all read
                </span>
                <span>Contineo & Campus sync</span>
              </div>
            </div>
          )}
        </div>

        {/* User Mini Avatar & Info */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <Avatar
            fallback={MOCK_CURRENT_USER.full_name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            className="h-8 w-8 ring-1 ring-blue-900/10"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {MOCK_CURRENT_USER.full_name}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
              <Badge variant="bmsce" className="px-1 py-0 text-[9px] rounded">
                {MOCK_CURRENT_USER.branch}
              </Badge>
              <span>Sem {MOCK_CURRENT_USER.semester}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

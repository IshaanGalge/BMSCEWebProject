import React from "react";
import Link from "next/link";
import {
  Upload,
  CalendarPlus,
  HelpCircle,
  PlusCircle,
  AlertTriangle,
  Coffee,
} from "lucide-react";

export function DashboardQuickActions() {
  const actions = [
    {
      title: "Upload Notes",
      subtitle: "Share PDF / PYQs",
      href: "/notes",
      icon: Upload,
      color: "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100",
    },
    {
      title: "Explore Events",
      subtitle: "Fests & Clubs",
      href: "/events",
      icon: CalendarPlus,
      color: "bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100",
    },
    {
      title: "Ask a Senior",
      subtitle: "Placements & ODs",
      href: "/qa",
      icon: HelpCircle,
      color: "bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100",
    },
    {
      title: "Sell on Market",
      subtitle: "Drafters & Books",
      href: "/marketplace",
      icon: PlusCircle,
      color: "bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100",
    },
    {
      title: "Lost Something?",
      subtitle: "Post campus alert",
      href: "/lost-found",
      icon: AlertTriangle,
      color: "bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100",
    },
    {
      title: "Canteen Status",
      subtitle: "Live menus & queues",
      href: "/canteen",
      icon: Coffee,
      color: "bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.title}
            href={act.href}
            className={`flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all duration-150 text-center shadow-2xs hover:shadow-xs group ${act.color}`}
          >
            <div className="p-2 rounded-lg bg-white/80 shadow-2xs mb-2 transition-transform group-hover:scale-110">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold leading-tight">
              {act.title}
            </span>
            <span className="text-[10px] opacity-75 mt-0.5 line-clamp-1">
              {act.subtitle}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

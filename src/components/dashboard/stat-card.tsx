import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconBg?: string;
  iconColor?: string;
  href?: string;
  change?: string;
  isPositive?: boolean;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-blue-900",
  href,
  change,
}: StatCardProps) {
  const content = (
    <Card className="p-5 flex items-start justify-between relative overflow-hidden group hover:border-blue-300">
      <div className="flex flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </span>
          {change && (
            <span className="text-xs font-semibold text-emerald-600">
              {change}
            </span>
          )}
        </div>
        {subtitle && (
          <span className="mt-1 text-xs text-slate-500 line-clamp-1">
            {subtitle}
          </span>
        )}
      </div>

      <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-105", iconBg)}>
        <Icon className={cn("h-5 w-5", iconColor)} />
      </div>

      {href && (
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-900" />
        </div>
      )}
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

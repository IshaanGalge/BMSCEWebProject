import React from "react";
import { Database, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeaturePlaceholderProps {
  featureName: string;
  phase?: string;
  tableMapping: string;
  description: string;
}

export function FeaturePlaceholderCard({
  featureName,
  phase = "Phase 1: Shell & Mock Data Active",
  tableMapping,
  description,
}: FeaturePlaceholderProps) {
  return (
    <div className="mb-6 rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white p-4 text-xs shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="bmsce" className="bg-blue-100 text-blue-900 border-blue-300">
            <Sparkles className="mr-1 h-3 w-3 text-blue-700" />
            {phase}
          </Badge>
          <span className="font-semibold text-slate-900">{featureName}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <Database className="h-3.5 w-3.5 text-blue-800" />
          <span className="font-mono text-[11px] text-blue-900 font-medium">
            Supabase Table: {tableMapping}
          </span>
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
        </div>
      </div>
      <p className="mt-2 text-slate-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Plus,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FeaturePlaceholderCard } from "@/components/common/feature-placeholder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MOCK_LOST_FOUND_ITEMS } from "@/lib/mock-data";

export default function LostFoundPage() {
  const [items] = useState(MOCK_LOST_FOUND_ITEMS);
  const [selectedType, setSelectedType] = useState<"All" | "Lost" | "Found">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <AppShell>
      <PageHeader
        title="Lost & Found Hub"
        description="Campus lost property registry. Reclaim your misplaced BMSCE ID card, lab calculators, or report items you found in classrooms."
        breadcrumbs={[{ label: "Lost & Found" }]}
        action={
          <Button variant="default" className="gap-2 bg-rose-600 hover:bg-rose-700 text-white">
            <Plus className="h-4 w-4" /> Report an Item
          </Button>
        }
      />

      <FeaturePlaceholderCard
        featureName="Feature 7: Lost and Found"
        tableMapping="public.lost_found_items (FK: reporter_id -> profiles)"
        description="Built for Supabase automated alerts matching lost USNs to student profiles, image attachments, campus security desk handover tracking, and resolved claim logs."
      />

      {/* Filter and Search Bar */}
      <div className="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by item name, location (e.g. Library, PG Block, Audi), or keyword..."
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedType("All")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedType === "All"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Items ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("Found")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedType === "Found"
                ? "bg-emerald-600 text-white font-semibold shadow-2xs"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            Found on Campus ({items.filter((i) => i.type === "Found").length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedType("Lost")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              selectedType === "Lost"
                ? "bg-rose-600 text-white font-semibold shadow-2xs"
                : "bg-rose-50 text-rose-800 hover:bg-rose-100"
            }`}
          >
            Lost Items ({items.filter((i) => i.type === "Lost").length})
          </button>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const isLost = item.type === "Lost";

          return (
            <Card
              key={item.id}
              className={`flex flex-col justify-between border-slate-200 ${
                isLost ? "hover:border-rose-300" : "hover:border-emerald-300"
              }`}
            >
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={isLost ? "destructive" : "success"}
                    className="font-bold text-xs"
                  >
                    {isLost ? "LOST ITEM" : "FOUND ITEM"}
                  </Badge>

                  <Badge variant="outline" className="text-[10px]">
                    {item.category}
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {item.title}
                </h3>
              </CardHeader>

              <CardContent className="space-y-3 pt-0 pb-3 text-xs">
                <p className="text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800">
                    <MapPin className="h-3.5 w-3.5 text-blue-900 shrink-0" />
                    <span>Location: {item.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>Reported: {item.date_reported}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200/60 pt-1.5 text-slate-500">
                    <span className="truncate">
                      By: <span className="font-semibold text-slate-700">{item.reporter_name}</span>
                    </span>
                    <span className="font-mono text-[10px] text-blue-900">
                      {item.reporter_usn}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 truncate max-w-[130px]">
                  {item.contact_info}
                </span>

                <Button
                  variant={isLost ? "outline" : "default"}
                  size="sm"
                  className={`text-xs ${
                    isLost
                      ? "border-rose-200 text-rose-800 hover:bg-rose-50"
                      : "bg-blue-900 hover:bg-blue-800"
                  }`}
                  onClick={() =>
                    alert(
                      `${isLost ? "I found this item" : "Claiming item"}: Please contact ${
                        item.contact_info
                      } or Gate 1 security desk.`
                    )
                  }
                >
                  {isLost ? "I Found This" : "Claim Item"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

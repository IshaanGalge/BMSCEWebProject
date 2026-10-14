"use client";

import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Star,
  Users,
  Search,
  Flame,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FeaturePlaceholderCard } from "@/components/common/feature-placeholder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_CANTEEN_PLACES } from "@/lib/mock-data";

export default function CanteenPage() {
  const [places] = useState(MOCK_CANTEEN_PLACES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "On-Campus Canteen",
    "Campus Kiosk",
    "Nearby Legend",
    "Quick Bites",
  ];

  const filteredPlaces = places.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesOpen = !onlyOpen || p.is_open;
    return matchesSearch && matchesCategory && matchesOpen;
  });

  return (
    <AppShell>
      <PageHeader
        title="Canteen & Nearby Places"
        description="Real-time campus food hub: live open/closed statuses, lunch rush tracker, menu specials, and historic Basavanagudi hangouts."
        breadcrumbs={[{ label: "Canteen & Food" }]}
        action={
          <Button variant="outline" className="gap-2">
            Suggest a Food Spot
          </Button>
        }
      />

      <FeaturePlaceholderCard
        featureName="Feature 4: Canteen and Nearby Places"
        tableMapping="public.places & public.menu_items (FK: place_id -> places)"
        description="Structured for live crowd reporting via student upvotes, digital token ordering, daily special board updates, and geo-distance calculation."
      />

      {/* Search and Filters */}
      <div className="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search food spots or dishes (e.g. Masala Dosa, Cold Coffee, Meals)..."
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-900 text-white font-semibold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyOpen}
              onChange={(e) => setOnlyOpen(e.target.checked)}
              className="rounded border-slate-300 text-blue-900 focus:ring-blue-600"
            />
            <span>Open Now Only</span>
          </label>
        </div>
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPlaces.map((place) => (
          <Card key={place.id} className="flex flex-col justify-between hover:border-blue-400">
            <CardHeader className="space-y-3 pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="bmsce" className="text-xs">
                  {place.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={place.is_open ? "success" : "destructive"}
                    className="text-[10px] font-semibold"
                  >
                    {place.is_open ? "Open Now" : "Closed"}
                  </Badge>
                  <span className="text-xs font-bold text-slate-500">
                    {place.price_range}
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl leading-tight">
                  {place.name}
                </CardTitle>
                <div className="flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{place.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 font-medium text-slate-700">
                  <Clock className="h-3.5 w-3.5 text-blue-900" /> {place.timing}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> {place.distance_walk}
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-0 pb-3 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-2.5 border border-slate-100">
                <span className="text-slate-500 font-medium">Rush / Queue Level:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5 text-blue-800" /> {place.crowd_level}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1.5">
                  <Flame className="h-3 w-3 text-amber-500" /> Popular Student Picks:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {place.specialties.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate max-w-[200px]">{place.location}</span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs hover:border-blue-900 hover:text-blue-900"
                onClick={() => alert(`Full digital menu for ${place.name} will be active in Supabase integration.`)}
              >
                View Full Menu
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

"use client";

import React, { useState } from "react";
import {
  Tag,
  Search,
  Plus,
  MapPin,
  PhoneCall,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FeaturePlaceholderCard } from "@/components/common/feature-placeholder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MOCK_MARKETPLACE_ITEMS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function MarketplacePage() {
  const [items] = useState(MOCK_MARKETPLACE_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Textbooks",
    "Drafters & Tools",
    "Calculators",
    "Hostel Gear",
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppShell>
      <PageHeader
        title="Student Marketplace"
        description="Peer-to-peer verified campus marketplace for second-hand textbooks, engineering drafters, VTU-approved calculators, and hostel gear."
        breadcrumbs={[{ label: "Marketplace" }]}
        action={
          <Button variant="default" className="gap-2 bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4" /> Sell an Item
          </Button>
        }
      />

      <FeaturePlaceholderCard
        featureName="Feature 6: Student Marketplace"
        tableMapping="public.market_items & public.market_categories (FK: seller_id -> profiles)"
        description="Engineered for Supabase Storage photo uploads (compressed thumbnails), in-app chat between buyers & sellers, and anti-scam USN verification."
      />

      {/* Filter and Search Bar */}
      <div className="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items (e.g. Drafter, Casio fx-991, Galvin OS, Cycle)..."
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Tag className="h-3 w-3" /> Categories:
          </span>
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
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredItems.map((item) => {
          const discountPercent = item.original_price
            ? Math.round(
                ((item.original_price - item.price) / item.original_price) * 100
              )
            : null;

          return (
            <Card
              key={item.id}
              className="flex flex-col justify-between hover:border-blue-400 group"
            >
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="bmsce" className="text-[10px]">
                    {item.category}
                  </Badge>
                  <Badge variant="secondary" className="text-[10px]">
                    {item.condition}
                  </Badge>
                </div>

                <div className="pt-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-blue-950">
                      {formatCurrency(item.price)}
                    </span>
                    {item.original_price && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatCurrency(item.original_price)}
                      </span>
                    )}
                    {discountPercent && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mt-1 line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </CardHeader>

              <CardContent className="space-y-2.5 pt-0 pb-3 text-xs">
                <p className="text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="rounded-lg bg-slate-50 p-2 border border-slate-100 text-[11px] text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                    <span>Handoff: {item.preferred_location}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pt-0.5">
                    <span>Seller: {item.seller_name}</span>
                    <span className="font-mono text-[10px] text-blue-900">
                      {item.seller_usn}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t border-slate-100 pt-3">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full gap-2 text-xs bg-blue-900 hover:bg-blue-800"
                  onClick={() =>
                    alert(
                      `Contacting Seller: ${item.seller_name} (${item.seller_usn}) at ${item.seller_contact}`
                    )
                  }
                >
                  <PhoneCall className="h-3.5 w-3.5" /> Contact Seller
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

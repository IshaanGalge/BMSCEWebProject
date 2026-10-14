"use client";

import React, { useState } from "react";
import {
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Search,
  Plus,
  Ticket,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FeaturePlaceholderCard } from "@/components/common/feature-placeholder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_EVENTS, MOCK_CLUBS } from "@/lib/mock-data";

export default function EventsPage() {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Hackathon", "Workshop", "Social", "Cultural"];

  const handleRegisterToggle = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const nextRegistered = !ev.is_registered;
          return {
            ...ev,
            is_registered: nextRegistered,
            registered_count: nextRegistered
              ? ev.registered_count + 1
              : ev.registered_count - 1,
          };
        }
        return ev;
      })
    );
  };

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.club_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || ev.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AppShell>
      <PageHeader
        title="Events & Clubs"
        description="Discover BMSCE club activities, annual fests like Utsav and Phase Shift, technical hackathons, and instant event ticketing."
        breadcrumbs={[{ label: "Events & Clubs" }]}
        action={
          <Button variant="default" className="gap-2 bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4" /> Host an Event / Club Post
          </Button>
        }
      />

      <FeaturePlaceholderCard
        featureName="Feature 3: Events & Clubs with Registration"
        tableMapping="public.events, public.clubs & public.event_registrations (UNIQUE: event_id, user_id)"
        description="Designed for Supabase transactional concurrency checks on max_seats, QR-ticket generation, team member invitations, and automated calendar reminders."
      />

      <Tabs defaultValue="events" className="space-y-6">
        <TabsList className="bg-slate-200/60 p-1">
          <TabsTrigger value="events" className="text-xs font-semibold gap-1.5">
            <Ticket className="h-3.5 w-3.5" /> Upcoming Campus Events ({events.length})
          </TabsTrigger>
          <TabsTrigger value="clubs" className="text-xs font-semibold gap-1.5">
            <Users className="h-3.5 w-3.5" /> BMSCE Recognized Clubs ({MOCK_CLUBS.length})
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Events */}
        <TabsContent value="events" className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, workshops, or venues (e.g. BSN Audi)..."
                className="pl-9 bg-slate-50 border-slate-200"
              />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
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

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((ev) => {
              const capacityPercent = Math.round(
                (ev.registered_count / ev.max_seats) * 100
              );

              return (
                <Card
                  key={ev.id}
                  className="flex flex-col justify-between border-slate-200 hover:border-blue-400"
                >
                  <CardHeader className="space-y-3 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="bmsce" className="font-semibold text-xs">
                        {ev.club_name}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="secondary" className="text-[10px]">
                          {ev.category}
                        </Badge>
                        <Badge
                          variant={ev.fee === 0 ? "success" : "outline"}
                          className="text-[10px]"
                        >
                          {ev.fee === 0 ? "Free Entry" : `₹${ev.fee}`}
                        </Badge>
                      </div>
                    </div>

                    <CardTitle className="text-lg leading-snug">
                      {ev.title}
                    </CardTitle>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {ev.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-0 pb-3 text-xs">
                    <div className="space-y-1.5 rounded-lg bg-slate-50 p-3 border border-slate-100">
                      <div className="flex items-center gap-2 text-slate-700 font-medium">
                        <Clock className="h-4 w-4 text-blue-800 shrink-0" />
                        <span>{ev.date_time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{ev.venue}</span>
                      </div>
                    </div>

                    {/* Capacity Indicator */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>Slots filled</span>
                        <span className="font-semibold text-slate-700">
                          {ev.registered_count} / {ev.max_seats} ({capacityPercent}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            capacityPercent > 80 ? "bg-amber-500" : "bg-blue-800"
                          }`}
                          style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-slate-100 pt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Deadline: {ev.registration_deadline}
                    </span>

                    <Button
                      variant={ev.is_registered ? "secondary" : "default"}
                      size="sm"
                      onClick={() => handleRegisterToggle(ev.id)}
                      className={`gap-1.5 text-xs font-semibold ${
                        ev.is_registered
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-blue-900 hover:bg-blue-800"
                      }`}
                    >
                      {ev.is_registered ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Registered (Tap to cancel)
                        </>
                      ) : (
                        <>
                          <Ticket className="h-4 w-4" />
                          Instant Register
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Tab 2: Clubs Directory */}
        <TabsContent value="clubs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_CLUBS.map((club) => (
              <Card key={club.id} className="flex flex-col justify-between p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="bmsce" className="text-[10px]">
                      {club.category}
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Users className="h-3 w-3" /> {club.member_count} members
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{club.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-3">
                    {club.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] text-slate-500 space-y-1">
                  <div>
                    Faculty: <span className="font-semibold text-slate-700">{club.coordinator_name}</span>
                  </div>
                  <div className="text-blue-900 font-mono text-[10px] truncate">
                    {club.contact_email}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

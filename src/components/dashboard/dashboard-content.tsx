import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  MessageSquareQuote,
  ShoppingBag,
  Search,
  UtensilsCrossed,
  ArrowRight,
  Download,
  ThumbsUp,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "./stat-card";
import { DashboardQuickActions } from "./quick-actions";
import {
  MOCK_CURRENT_USER,
  MOCK_DASHBOARD_STATS,
  MOCK_NOTES,
  MOCK_EVENTS,
  MOCK_CANTEEN_PLACES,
  MOCK_QA_QUESTIONS,
  MOCK_MARKETPLACE_ITEMS,
  MOCK_LOST_FOUND_ITEMS,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 p-6 md:p-8 text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="text-[11px] font-semibold bg-amber-400 text-slate-950 border-0">
                <Sparkles className="mr-1 h-3 w-3" /> Campus Active • 2026
              </Badge>
              <span className="text-xs text-blue-200">
                Odd Semester • Week 8
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Namaskara, {MOCK_CURRENT_USER.full_name}! 👋
            </h1>
            <p className="text-sm text-blue-200 max-w-xl">
              Here is your campus pulse for BMSCE. Prepare for CIE-2 exams, register for HackBMSCE 2026, or check what is cooking at the canteen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/notes">
              <Button variant="accent" size="default" className="gap-2">
                <BookOpen className="h-4 w-4" /> 6th Sem Notes
              </Button>
            </Link>
            <Link href="/events">
              <Button variant="outline" size="default" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                Utsav & Events
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle geometric background shapes */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Quick Action Buttons */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Quick Actions
          </h2>
          <span className="text-xs text-slate-400">One-click campus shortcuts</span>
        </div>
        <DashboardQuickActions />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          title="Verified Notes"
          value={MOCK_DASHBOARD_STATS.totalNotes}
          subtitle="Autonomous Syllabus"
          icon={BookOpen}
          iconBg="bg-blue-100"
          iconColor="text-blue-900"
          href="/notes"
          change="+12 this wk"
        />
        <StatCard
          title="Campus Events"
          value={MOCK_DASHBOARD_STATS.upcomingEvents}
          subtitle="Hackathons & Fests"
          icon={Calendar}
          iconBg="bg-purple-100"
          iconColor="text-purple-900"
          href="/events"
        />
        <StatCard
          title="Senior Q&As"
          value={MOCK_DASHBOARD_STATS.unansweredQuestions}
          subtitle="Placements & CIE"
          icon={MessageSquareQuote}
          iconBg="bg-amber-100"
          iconColor="text-amber-900"
          href="/qa"
        />
        <StatCard
          title="Market Deals"
          value={MOCK_DASHBOARD_STATS.activeMarketDeals}
          subtitle="Drafters, Books, Tech"
          icon={ShoppingBag}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-900"
          href="/marketplace"
        />
        <StatCard
          title="Lost & Found"
          value={MOCK_DASHBOARD_STATS.lostItemsActive}
          subtitle="Active campus reports"
          icon={Search}
          iconBg="bg-rose-100"
          iconColor="text-rose-900"
          href="/lost-found"
        />
        <StatCard
          title="Food & Canteen"
          value="Open"
          subtitle="4 spots serving now"
          icon={UtensilsCrossed}
          iconBg="bg-sky-100"
          iconColor="text-sky-900"
          href="/canteen"
        />
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Study Resources & Events */}
        <div className="lg:col-span-2 space-y-8">
          {/* Notes Section Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg">Trending Study Resources</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Handpicked handwritten notes & question banks for upcoming CIE exams
                </p>
              </div>
              <Link href="/notes">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-blue-900 font-semibold">
                  View All ({MOCK_NOTES.length}) <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_NOTES.slice(0, 3).map((note) => (
                <div
                  key={note.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-100/70 transition-colors gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-900 font-bold text-xs uppercase">
                      {note.file_type}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="bmsce" className="text-[10px] py-0">
                          {note.subject_code}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {note.subject_name} • Sem {note.semester}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 truncate mt-1">
                        {note.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span>By {note.author_name}</span>
                        <span>•</span>
                        <span>{note.file_size}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-700 font-medium">
                          <ThumbsUp className="h-3 w-3" /> {note.upvotes_count}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="shrink-0 gap-1.5 text-xs">
                    <Download className="h-3.5 w-3.5 text-blue-900" /> Download
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg">Upcoming Events & Fests</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Club workshops, hackathons, and auditions across BMSCE campus
                </p>
              </div>
              <Link href="/events">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-blue-900 font-semibold">
                  All Events <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_EVENTS.slice(0, 2).map((ev) => (
                <div
                  key={ev.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-200/90 bg-white hover:border-blue-300 transition-all gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px] font-semibold">
                        {ev.club_name}
                      </Badge>
                      <Badge variant="info" className="text-[10px]">
                        {ev.category}
                      </Badge>
                      {ev.fee === 0 ? (
                        <Badge variant="success" className="text-[10px]">Free Entry</Badge>
                      ) : (
                        <span className="text-xs font-semibold text-slate-700">₹{ev.fee}</span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      {ev.title}
                    </h4>
                    <p className="text-xs text-slate-600 line-clamp-1">
                      {ev.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock className="h-3.5 w-3.5 text-blue-700" /> {ev.date_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" /> {ev.venue}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto justify-between shrink-0">
                    <span className="text-[11px] text-slate-500">
                      {ev.registered_count} / {ev.max_seats} filled
                    </span>
                    {ev.is_registered ? (
                      <Button variant="secondary" size="sm" className="gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Registered
                      </Button>
                    ) : (
                      <Button variant="default" size="sm" className="bg-blue-900 hover:bg-blue-800">
                        Register Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ask a Senior Spotlight */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg">Senior Advice & Placement Discussions</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verified answers from 7th/8th sem seniors and recent graduates
                </p>
              </div>
              <Link href="/qa">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-blue-900 font-semibold">
                  Ask Question <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_QA_QUESTIONS.slice(0, 2).map((qa) => (
                <div key={qa.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5 flex-wrap">
                      {qa.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[10px]">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">{qa.answers_count} answers</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 hover:text-blue-900 cursor-pointer">
                    {qa.title}
                  </h4>
                  {qa.top_answer && (
                    <div className="mt-2 rounded-lg bg-white p-3 border border-slate-200/70 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-blue-900">
                          {qa.top_answer.author_name}
                        </span>
                        <Badge variant="bmsce" className="text-[9px]">
                          {qa.top_answer.author_role}
                        </Badge>
                      </div>
                      <p className="text-slate-600 line-clamp-2 leading-relaxed">
                        &quot;{qa.top_answer.content}&quot;
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Column: Canteen, Marketplace, Lost & Found */}
        <div className="space-y-8">
          {/* Canteen & Campus Spots */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Canteen & Nearby Spots</CardTitle>
              <Link href="/canteen">
                <span className="text-xs text-blue-900 font-semibold hover:underline">
                  Menu & Wait
                </span>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_CANTEEN_PLACES.slice(0, 3).map((place) => (
                <div
                  key={place.id}
                  className="p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {place.name}
                    </span>
                    <Badge
                      variant={place.is_open ? "success" : "destructive"}
                      className="text-[10px] py-0"
                    >
                      {place.is_open ? "Open Now" : "Closed"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <MapPin className="h-3 w-3 text-slate-400" />
                    <span>{place.distance_walk}</span>
                    <span>•</span>
                    <span className="text-amber-600 font-semibold">★ {place.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500 truncate max-w-[170px]">
                      {place.specialties[0]}
                    </span>
                    <span className="text-xs font-medium text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                      {place.crowd_level}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Student Marketplace Snippet */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Marketplace Deals</CardTitle>
              <Link href="/marketplace">
                <span className="text-xs text-blue-900 font-semibold hover:underline">
                  View All
                </span>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_MARKETPLACE_ITEMS.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-[10px]">
                        {item.category}
                      </Badge>
                      <span className="text-sm font-bold text-blue-950">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                    <h5 className="text-xs font-semibold text-slate-900 mt-1 line-clamp-1">
                      {item.title}
                    </h5>
                    <span className="text-[11px] text-slate-500 mt-0.5">
                      Condition: {item.condition} • {item.preferred_location}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Lost and Found Campus Radar */}
          <Card className="border-rose-100 bg-rose-50/20">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-rose-600" />
                <CardTitle className="text-base text-rose-950">Lost & Found Alert</CardTitle>
              </div>
              <Link href="/lost-found">
                <span className="text-xs text-rose-700 font-semibold hover:underline">
                  Report Item
                </span>
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {MOCK_LOST_FOUND_ITEMS.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg border border-rose-200/60 bg-white text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={item.type === "Found" ? "success" : "destructive"}
                      className="text-[10px] py-0"
                    >
                      {item.type.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] text-slate-400">
                      {item.date_reported}
                    </span>
                  </div>
                  <h6 className="font-semibold text-slate-900 truncate">
                    {item.title}
                  </h6>
                  <p className="text-[11px] text-slate-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" /> {item.location}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

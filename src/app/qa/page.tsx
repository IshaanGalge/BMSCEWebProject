"use client";

import React, { useState } from "react";
import {
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  Search,
  Plus,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FeaturePlaceholderCard } from "@/components/common/feature-placeholder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MOCK_QA_QUESTIONS } from "@/lib/mock-data";

export default function QAPage() {
  const [questions] = useState(MOCK_QA_QUESTIONS);
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [upvotesMap, setUpvotesMap] = useState<Record<string, boolean>>({});

  const filterTags = [
    "All",
    "Placements",
    "Attendance",
    "Electives",
    "Internships",
    "CIE",
  ];

  const handleVote = (id: string) => {
    setUpvotesMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag =
      selectedTag === "All" ||
      q.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  return (
    <AppShell>
      <PageHeader
        title="Ask a Senior Q&A"
        description="Get candid advice on campus placements, tier-1 company rounds, project guide selections, and academic rules from BMSCE seniors & alumni."
        breadcrumbs={[{ label: "Ask a Senior" }]}
        action={
          <Button variant="default" className="gap-2 bg-blue-900 hover:bg-blue-800">
            <Plus className="h-4 w-4" /> Ask a Question
          </Button>
        }
      />

      <FeaturePlaceholderCard
        featureName="Feature 5: Ask a Senior Q&A Board"
        tableMapping="public.questions, public.answers & public.qa_votes (FK: author_id -> profiles)"
        description="Ready for Supabase RLS verified badges for alumni and tier-1 placed students, markdown answers, notification webhooks, and threaded replies."
      />

      {/* Filter and Search Bar */}
      <div className="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions on placements, faculty reviews, grading, or syllabus..."
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Tag className="h-3 w-3" /> Popular Topics:
          </span>
          {filterTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedTag === tag
                  ? "bg-blue-900 text-white font-semibold shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isVoted = upvotesMap[q.id];
          const displayUpvotes = q.upvotes_count + (isVoted ? 1 : 0);

          return (
            <Card key={q.id} className="p-5 hover:border-blue-400">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {q.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        #{tag}
                      </Badge>
                    ))}
                    {q.is_resolved && (
                      <Badge variant="success" className="text-[10px] gap-1">
                        <CheckCircle className="h-3 w-3" /> Answered by Senior
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-slate-900 leading-snug">
                    {q.title}
                  </h3>

                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {q.content}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                    <span>
                      Asked by <span className="font-semibold text-slate-800">{q.author_name}</span> ({q.author_usn})
                    </span>
                    <span>•</span>
                    <Badge variant="outline" className="text-[10px]">
                      {q.author_branch} • Sem {q.author_sem}
                    </Badge>
                  </div>
                </div>

                {/* Vote counter & Answer count */}
                <div className="flex md:flex-col items-center gap-2 shrink-0 w-full md:w-auto justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(q.id)}
                    className={`gap-1.5 text-xs ${
                      isVoted
                        ? "bg-blue-50 text-blue-900 border-blue-300 font-bold"
                        : "text-slate-600 hover:text-blue-900"
                    }`}
                  >
                    <ThumbsUp className={`h-3.5 w-3.5 ${isVoted ? "fill-blue-900 text-blue-900" : ""}`} />
                    <span>{displayUpvotes} upvotes</span>
                  </Button>

                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>{q.answers_count} answers</span>
                  </div>
                </div>
              </div>

              {/* Verified Senior Answer Preview Box */}
              {q.top_answer && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      <span className="text-xs font-bold text-blue-950">
                        {q.top_answer.author_name}
                      </span>
                    </div>
                    <Badge variant="bmsce" className="text-[10px]">
                      {q.top_answer.author_role}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    &quot;{q.top_answer.content}&quot;
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="text-emerald-700 font-medium">
                      ✓ Marked helpful by {q.top_answer.upvotes} students
                    </span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs text-blue-900 font-semibold"
                      onClick={() => alert("Thread expansion will connect to Supabase answers table.")}
                    >
                      View all {q.answers_count} replies →
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}

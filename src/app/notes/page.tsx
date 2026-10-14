"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Search,
  Upload,
  Download,
  ThumbsUp,
  Filter,
  FileText,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeader } from "@/components/layout/page-header";
import { FeaturePlaceholderCard } from "@/components/common/feature-placeholder-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { MOCK_NOTES } from "@/lib/mock-data";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string>("All");
  const [selectedSemester, setSelectedSemester] = useState<string>("All");
  const [upvotedNotes, setUpvotedNotes] = useState<Record<string, boolean>>({});

  const branches = ["All", "CSE", "ISE", "AIML", "ECE", "ME"];
  const semesters = ["All", "Sem 4", "Sem 5", "Sem 6"];

  const filteredNotes = MOCK_NOTES.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch =
      selectedBranch === "All" || note.branch === selectedBranch;
    const matchesSemester =
      selectedSemester === "All" || `Sem ${note.semester}` === selectedSemester;
    return matchesSearch && matchesBranch && matchesSemester;
  });

  const toggleUpvote = (id: string) => {
    setUpvotedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AppShell>
      <PageHeader
        title="Notes & Study Hub"
        description="Autonomous syllabus notes, solved VTU/BMSCE question papers, and lab manuals organized by branch and semester."
        breadcrumbs={[{ label: "Notes & Study Hub" }]}
        action={
          <Button variant="default" className="gap-2 bg-blue-900 hover:bg-blue-800">
            <Upload className="h-4 w-4" /> Upload Study Notes
          </Button>
        }
      />

      <FeaturePlaceholderCard
        featureName="Feature 2: Notes & Study Resources"
        tableMapping="public.notes & public.subjects (FK: uploader_id -> profiles)"
        description="Architecture ready for Supabase Storage buckets ('bmsce-notes') with signed download URLs, semantic vector search, and faculty/senior moderation flags."
      />

      {/* Filter and Search Bar */}
      <div className="mb-6 space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by subject code (e.g. 21CS52), subject name, or topic..."
            className="pl-9 bg-slate-50 border-slate-200"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Branch Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3" /> Branch:
            </span>
            {branches.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setSelectedBranch(b)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedBranch === b
                    ? "bg-blue-900 text-white font-semibold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Semester Filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 mr-1">Semester:</span>
            {semesters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSemester(s)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedSemester === s
                    ? "bg-blue-900 text-white font-semibold shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white">
          <BookOpen className="h-10 w-10 text-slate-400 mb-2" />
          <h3 className="text-base font-bold text-slate-800">No notes found</h3>
          <p className="text-xs text-slate-500 max-w-sm mt-1">
            Try adjusting your search query or branch filter, or be the first to upload notes for this subject!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.map((note) => {
            const isUpvoted = upvotedNotes[note.id];
            const upvotes = note.upvotes_count + (isUpvoted ? 1 : 0);

            return (
              <Card key={note.id} className="flex flex-col justify-between hover:border-blue-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="bmsce" className="font-mono text-xs">
                        {note.subject_code}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        Sem {note.semester} • {note.branch}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-slate-50">
                      Module {note.module_no}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {note.description}
                  </p>
                </CardHeader>

                <CardContent className="pb-3 pt-0 text-xs text-slate-500 space-y-2">
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <span className="truncate">
                      Uploader: <span className="font-medium text-slate-800">{note.author_name}</span>
                    </span>
                    <span className="font-mono text-[10px] text-blue-900">{note.author_usn}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {note.file_size} • {note.file_type.toUpperCase()}
                    </span>
                    <span>{note.downloads_count} downloads</span>
                  </div>
                </CardContent>

                <CardFooter className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleUpvote(note.id)}
                    className={`gap-1.5 text-xs ${
                      isUpvoted
                        ? "text-blue-900 bg-blue-50 font-bold"
                        : "text-slate-600 hover:text-blue-900"
                    }`}
                  >
                    <ThumbsUp className={`h-3.5 w-3.5 ${isUpvoted ? "fill-blue-900" : ""}`} />
                    <span>{upvotes}</span>
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1.5 text-xs bg-blue-900 hover:bg-blue-800"
                    onClick={() => alert(`Downloading: ${note.title} (PDF demo)`)}
                  >
                    <Download className="h-3.5 w-3.5" /> Download PDF
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}

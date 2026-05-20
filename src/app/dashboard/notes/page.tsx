"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, FileText, Sparkles } from "lucide-react";

type Note = { id: string; title: string; excerpt: string; date: string; tags: string[] };

export default function NotesPage() {
  const [notes] = useState<Note[]>([
    { id: "1", title: "Thermodynamics Laws", excerpt: "The zeroth law of thermodynamics states that if two thermodynamic systems...", date: "Today", tags: ["Physics", "Exam"] },
    { id: "2", title: "Linear Algebra: Matrices", excerpt: "A matrix is a rectangular array or table of numbers, symbols, or expressions...", date: "Yesterday", tags: ["Math"] },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Intelligent Notes</h1>
          <p className="text-muted-foreground mt-1">Your AI-powered knowledge base.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Note
        </Button>
      </div>

      <div className="flex gap-2 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            className="w-full pl-10 h-10 rounded-md border border-input bg-card/50 backdrop-blur-sm px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          AI Summarize Folder
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pb-4">
        {notes.map((note) => (
          <Card key={note.id} className="border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{note.date}</span>
              </div>
              <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{note.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{note.excerpt}</p>
              <div className="flex gap-2">
                {note.tags.map(t => (
                  <span key={t} className="text-xs px-2 py-1 bg-secondary rounded-md">{t}</span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Clock, MapPin, Sparkles, Trash2, X, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

type Event = { 
  id: string; 
  title: string; 
  time: string; 
  location: string; 
  type: "class" | "study" 
};

export default function TimetablePage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState<"class" | "study">("class");

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, "timetable"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "asc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedEvents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      setEvents(fetchedEvents);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    await addDoc(collection(db, "timetable"), {
      userId: user.uid,
      title,
      time,
      location,
      type,
      createdAt: serverTimestamp(),
    });
    
    setTitle("");
    setTime("");
    setLocation("");
    setType("class");
    setIsModalOpen(false);
  };

  const removeEvent = async (id: string) => {
    await deleteDoc(doc(db, "timetable", id));
  };

  const handleAutoSchedule = async () => {
    // This could integrate with AI SDK later to generate a schedule based on assignments
    alert("AI Auto-Schedule will be available soon! It will analyze your assignments and generate optimal study blocks.");
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Timetable</h1>
          <p className="text-muted-foreground mt-1">AI-optimized schedule for maximum productivity.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={handleAutoSchedule}>
            <Sparkles className="w-4 h-4 text-primary" />
            Auto-Schedule
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center p-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground bg-card/50 rounded-xl border border-dashed border-border">
              No events scheduled. Use AI Auto-Schedule to generate a plan!
            </div>
          ) : (
            events.map((event) => (
              <Card key={event.id} className="border-border bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-12 rounded-full ${event.type === "class" ? "bg-blue-500" : "bg-orange-500"}`} />
                    <div>
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="space-y-6">
          <Card className="border-border bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">AI Schedule Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm p-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                You have back-to-back intense classes this morning. I've scheduled a 90-minute break before your deep work session.
              </div>
              <div className="text-sm p-3 rounded-lg bg-card border border-border">
                Your peak focus hours are typically between 2 PM and 5 PM. Try to tackle your hardest assignments then!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">New Event</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddEvent} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Advanced Mathematics" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time</label>
                    <input required value={time} onChange={e => setTime(e.target.value)} type="text" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 09:00 AM - 10:30 AM" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input required value={location} onChange={e => setLocation(e.target.value)} type="text" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Room 402" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Type</label>
                  <select required value={type} onChange={e => setType(e.target.value as any)} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="class">Class</option>
                    <option value="study">Deep Study Session</option>
                  </select>
                </div>
                
                <div className="pt-4 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Create Event</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

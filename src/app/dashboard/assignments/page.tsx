"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, CheckCircle2, Circle, Clock, Trash2, X, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

type Assignment = { 
  id: string; 
  title: string; 
  subject: string; 
  dueDate: string; 
  status: "pending" | "completed"; 
  priority: "high" | "medium" | "low";
};

export default function AssignmentsPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, "assignments"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Assignment[];
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const toggleStatus = async (task: Assignment) => {
    const taskRef = doc(db, "assignments", task.id);
    await updateDoc(taskRef, {
      status: task.status === "pending" ? "completed" : "pending"
    });
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "assignments", id));
  };

  const handleAddAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    await addDoc(collection(db, "assignments"), {
      userId: user.uid,
      title,
      subject,
      dueDate,
      status: "pending",
      priority,
      createdAt: serverTimestamp(),
    });
    
    setTitle("");
    setSubject("");
    setDueDate("");
    setPriority("medium");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assignment Tracker</h1>
          <p className="text-muted-foreground mt-1">Keep track of your deadlines.</p>
        </div>
        <Button className="gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          New Assignment
        </Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center p-8 bg-card/50 rounded-xl border border-border border-dashed">
            <p className="text-muted-foreground">No assignments yet. Time to relax or add one!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className={`border-border transition-all ${task.status === "completed" ? "bg-muted/30 opacity-70" : "bg-card/50 backdrop-blur-sm hover:border-primary/50"}`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleStatus(task)} className="shrink-0 transition-transform hover:scale-110">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-muted-foreground" />
                    )}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-lg ${task.status === "completed" && "line-through text-muted-foreground"}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="bg-secondary/50 px-2 py-0.5 rounded-md">{task.subject}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.dueDate ? format(new Date(task.dueDate), "MMM d, yyyy") : "No date"}</span>
                      {task.priority === "high" && <span className="text-red-500 font-medium">High Priority</span>}
                      {task.priority === "low" && <span className="text-blue-500 font-medium">Low Priority</span>}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
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
                <h2 className="text-2xl font-bold">New Assignment</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddAssignment} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <input required value={title} onChange={e => setTitle(e.target.value)} type="text" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. History Essay" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <input required value={subject} onChange={e => setSubject(e.target.value)} type="text" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. History" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <input required value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select required value={priority} onChange={e => setPriority(e.target.value as any)} className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end gap-2">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                  <Button type="submit">Create Task</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

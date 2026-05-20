"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Flame, Headphones, ShieldX } from "lucide-react";

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"pomodoro" | "shortBreak" | "longBreak">("pomodoro");

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play sound or notification here
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "pomodoro" ? 25 * 60 : mode === "shortBreak" ? 5 * 60 : 15 * 60);
  };

  const setTimerMode = (newMode: "pomodoro" | "shortBreak" | "longBreak") => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(newMode === "pomodoro" ? 25 * 60 : newMode === "shortBreak" ? 5 * 60 : 15 * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Focus Mode</h1>
        <p className="text-muted-foreground">Eliminate distractions and get to work.</p>
      </div>

      <Card className="w-full max-w-md border-border bg-card/50 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {isActive && <div className="absolute inset-0 bg-primary/5 animate-pulse -z-10" />}
        <CardContent className="p-8 flex flex-col items-center">
          
          <div className="flex bg-muted/50 p-1 rounded-full mb-8">
            <button 
              onClick={() => setTimerMode("pomodoro")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${mode === "pomodoro" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Pomodoro
            </button>
            <button 
              onClick={() => setTimerMode("shortBreak")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${mode === "shortBreak" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Short Break
            </button>
            <button 
              onClick={() => setTimerMode("longBreak")}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${mode === "longBreak" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Long Break
            </button>
          </div>

          <div className="text-8xl font-black tracking-tighter tabular-nums mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            {formatTime(timeLeft)}
          </div>

          <div className="flex items-center gap-4">
            <Button size="lg" className="rounded-full w-32 shadow-lg shadow-primary/20" onClick={toggleTimer}>
              {isActive ? <><Pause className="w-5 h-5 mr-2" /> Pause</> : <><Play className="w-5 h-5 mr-2" /> Start</>}
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12" onClick={resetTimer}>
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>

        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="flex flex-col items-center p-4 rounded-2xl bg-card/50 border border-border">
          <Flame className="w-6 h-6 text-orange-500 mb-2" />
          <span className="text-sm font-medium">3 Day Streak</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-2xl bg-card/50 border border-border">
          <ShieldX className="w-6 h-6 text-red-500 mb-2" />
          <span className="text-sm font-medium text-center">Websites Blocked</span>
        </div>
        <div className="flex flex-col items-center p-4 rounded-2xl bg-card/50 border border-border cursor-pointer hover:bg-card transition-colors">
          <Headphones className="w-6 h-6 text-blue-500 mb-2" />
          <span className="text-sm font-medium text-center">Lofi Ambient</span>
        </div>
      </div>

    </div>
  );
}

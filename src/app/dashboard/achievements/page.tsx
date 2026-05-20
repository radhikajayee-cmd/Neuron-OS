import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Need to create or fake this if not installed
import { Trophy, Flame, Target, Star, Crown, Zap } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    { icon: Flame, title: "7-Day Streak", desc: "Studied for 7 consecutive days.", xp: 500, unlocked: true },
    { icon: Target, title: "Laser Focus", desc: "Completed a 4-hour deep work session.", xp: 1000, unlocked: true },
    { icon: Star, title: "Perfect Score", desc: "Got 100% on an AI Quiz.", xp: 250, unlocked: false },
    { icon: Crown, title: "Top Scholar", desc: "Ranked #1 on the weekly leaderboard.", xp: 2000, unlocked: false },
    { icon: Zap, title: "Speed Reader", desc: "Summarized 10 documents using AI.", xp: 300, unlocked: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 max-w-5xl mx-auto">
      
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gamification & XP</h1>
          <p className="text-muted-foreground mt-1">Level up your brain.</p>
        </div>

        <Card className="w-full md:w-auto border-border bg-card/50 backdrop-blur-sm shadow-xl border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="p-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0 border border-primary/30 shadow-inner">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Level 12</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 font-medium">Scholar</span>
              </div>
              <h2 className="text-2xl font-black">12,450 XP</h2>
              <div className="w-full h-2 bg-background rounded-full mt-2 overflow-hidden border border-border">
                <div className="h-full bg-primary w-[75%]" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">2,550 XP to Level 13</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Badges</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <Card key={i} className={`border-border transition-all ${a.unlocked ? "bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50" : "bg-muted/30 opacity-60 grayscale"}`}>
              <CardContent className="p-5 flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${a.unlocked ? "bg-primary/20" : "bg-muted"}`}>
                  <a.icon className={`w-6 h-6 ${a.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{a.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
                  <div className="mt-2 text-xs font-medium text-primary">+{a.xp} XP</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}

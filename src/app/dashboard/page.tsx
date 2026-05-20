import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, CalendarDays, Flame, CheckCircle2, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Student</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your studies today.</p>
        </div>
        <Button className="gap-2 rounded-full">
          <Bot className="w-4 h-4" />
          Ask AI Assistant
        </Button>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Flame className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">14 Days</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up! 🔥</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Focus Hours</CardTitle>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">32h 15m</div>
            <p className="text-xs text-muted-foreground mt-1">+4h from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">12 / 15</div>
            <p className="text-xs text-muted-foreground mt-1">80% completion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
            <CalendarDays className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">2</div>
            <p className="text-xs text-muted-foreground mt-1">Next: Physics in 4 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Chart / Timeline Area */}
        <Card className="col-span-4 border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>AI Study Recommendations</CardTitle>
            <CardDescription>Based on your recent performance and upcoming deadlines.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 flex items-start gap-4">
              <Bot className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">Review Thermodynamics</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  You scored 65% on the last Physics quiz. I've generated a 15-minute interactive review session for you.
                </p>
                <Button variant="link" className="p-0 h-auto mt-2">Start Review ➔</Button>
              </div>
            </div>
            
            <div className="p-4 rounded-xl border border-border bg-background flex items-start gap-4">
              <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold">Complete Math Assignment</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Due tomorrow at 11:59 PM. You have estimated 2 hours remaining on this task.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule / Timetable Widget */}
        <Card className="col-span-3 border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your classes and planned focus blocks.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-primary/30">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                <h5 className="font-semibold text-sm">09:00 AM - 10:30 AM</h5>
                <p className="text-muted-foreground">Advanced Mathematics (Room 402)</p>
              </div>
              <div className="relative pl-6 border-l-2 border-orange-500/30">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-orange-500" />
                <h5 className="font-semibold text-sm">11:00 AM - 12:30 PM</h5>
                <p className="text-muted-foreground">Physics: Thermodynamics</p>
              </div>
              <div className="relative pl-6 border-l-2 border-blue-500/30">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-background border-2 border-blue-500 animate-pulse" />
                <h5 className="font-semibold text-sm text-blue-500">02:00 PM - 04:00 PM (Current)</h5>
                <p className="text-muted-foreground">Deep Work: Math Assignment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

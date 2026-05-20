import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, Clock, Shield, Target, Users } from "lucide-react";

export default function AboutPage() {
  const features = [
    { icon: Brain, title: "AI Study Assistant", desc: "Get instant answers, practice quizzes, and note summaries from an elite AI tutor." },
    { icon: Clock, title: "Focus Mode", desc: "Deep work sessions with built-in Pomodoro timers and distraction blocking." },
    { icon: Target, title: "Smart Timetable", desc: "AI-generated schedules that adapt to your deadlines and study habits." },
    { icon: Users, title: "Collaboration Rooms", desc: "Real-time multiplayer study rooms with shared whiteboards and chat." },
    { icon: Shield, title: "Gamification", desc: "Earn XP, unlock badges, and compete on leaderboards for ultimate motivation." },
    { icon: BookOpen, title: "Intelligent Notes", desc: "Markdown-powered editor with auto-summarization and knowledge graphs." }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 -translate-y-12 inset-x-0 h-[500px] w-full bg-gradient-to-b from-blue-500/10 via-purple-500/5 to-transparent blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 py-16">
        <Link href="/" className={buttonVariants({ variant: "ghost", className: "mb-8 hover:bg-transparent hover:text-primary" })}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Meet <span className="text-primary">NeuronOS</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We built a real futuristic student operating system. It combines the best of Notion, ChatGPT, and Duolingo into one unified, distraction-free environment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card/50 border border-border backdrop-blur-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/10 animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '600ms' }}>
          <h2 className="text-3xl font-bold mb-6">Ready to upgrade your brain?</h2>
          <Link href="/login" className={buttonVariants({ size: "lg", className: "rounded-full px-8 shadow-lg shadow-primary/25" })}>
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  );
}

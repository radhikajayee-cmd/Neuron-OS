"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Bot, 
  Calendar, 
  CheckSquare, 
  BookOpen, 
  Focus, 
  Trophy, 
  Settings,
  LogOut
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const routes = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", path: "/dashboard/ai", icon: Bot },
  { name: "Timetable", path: "/dashboard/timetable", icon: Calendar },
  { name: "Assignments", path: "/dashboard/assignments", icon: CheckSquare },
  { name: "Notes", path: "/dashboard/notes", icon: BookOpen },
  { name: "Focus Mode", path: "/dashboard/focus", icon: Focus },
  { name: "Achievements", path: "/dashboard/achievements", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen bg-card/50 backdrop-blur-xl border-r border-border flex flex-col justify-between sticky top-0">
      <div>
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl leading-none">N</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              NeuronOS
            </span>
          </Link>
        </div>

        <nav className="space-y-1 px-4 mt-6">
          {routes.map((route) => {
            const isActive = pathname === route.path || pathname?.startsWith(`${route.path}/`);
            return (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <route.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 space-y-1">
        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-muted/50 hover:text-foreground group",
            pathname === "/dashboard/settings" && "bg-primary/10 text-primary font-medium"
          )}
        >
          <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span>Settings</span>
        </Link>
        <button
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}

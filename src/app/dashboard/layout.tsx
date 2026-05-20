import { Sidebar } from "@/components/sidebar";
import { ThemeToggle } from "@/components/theme-toggle"; // Need to create this

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top bar for mobile/theme toggle */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-end px-6 sticky top-0 z-10">
          <ThemeToggle />
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

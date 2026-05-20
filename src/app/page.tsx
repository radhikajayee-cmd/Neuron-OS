import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="absolute top-0 -translate-y-12 inset-x-0 h-[500px] w-full bg-gradient-to-b from-blue-500/20 via-purple-500/10 to-transparent blur-3xl -z-10" />

      <main className="flex flex-col items-center justify-center text-center space-y-8 px-4 z-10">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Introducing NeuronOS 1.0
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60 max-w-4xl">
          The Future of <span className="text-primary">Learning</span> is Here.
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Notion meets ChatGPT. Manage assignments, master topics with AI, focus deeply, and collaborate globally—all in one elite operating system.
        </p>
        
        <div className="flex items-center space-x-4 pt-4">
          <Link href="/login" className={buttonVariants({ size: "lg", className: "rounded-full px-8 shadow-lg shadow-primary/25 transition-transform hover:scale-105" })}>
            Get Started
          </Link>
          <Link href="/about" className={buttonVariants({ variant: "outline", size: "lg", className: "rounded-full px-8 backdrop-blur-md bg-background/50" })}>
            Learn More
          </Link>
        </div>
      </main>

      {/* Mock UI Preview */}
      <div className="mt-16 w-full max-w-5xl rounded-t-3xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl p-4 overflow-hidden -mb-32 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="h-64 rounded-xl bg-muted/50 border border-border/50 animate-pulse"></div>
      </div>
    </div>
  );
}

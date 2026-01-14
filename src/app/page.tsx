import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import JobCalendar from "@/components/JobCalendar";
import Link from "next/link";
import { Settings2 } from "lucide-react";

export default async function Home() {
  const jobs = await db.job.findMany({
    include: { customer: true },
    orderBy: { id: "desc" },
  });

  return (
    // Changed bg-black text-white to adaptive background/foreground
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 transition-colors duration-300">
      {/* 1. ADAPTIVE NAV */}
      <nav className="border-b border-border px-6 py-4 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              C
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">
              CosmicGutter
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dispatch">
              <Button className="bg-secondary hover:bg-secondary/80 border border-border text-foreground font-bold uppercase tracking-widest text-[10px] h-9 px-4 transition-all">
                <Settings2 className="mr-2 h-3.5 w-3.5" /> Open Dispatch
              </Button>
            </Link>
            <Link href="/register">
              {" "}
              <Button className="bg-secondary hover:bg-secondary/80 border border-border text-foreground font-bold uppercase tracking-widest text-[10px] h-9 px-4 transition-all">
                <Settings2 className="mr-2 h-3.5 w-3.5" /> register
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-4 lg:p-10">
        <section className="space-y-8">
          {/* 2. HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-4">
            <div>
              <h2 className="text-sm font-black text-blue-600 dark:text-blue-500 uppercase tracking-[0.3em] mb-1">
                Fleet Status
              </h2>
              <h1 className="text-4xl font-bold tracking-tight">
                Master Schedule
              </h1>
            </div>

            <div className="flex gap-4">
              {/* Stats Cards: bg-muted/50 works for both themes */}
              <div className="bg-muted/50 border border-border px-5 py-2 rounded-2xl backdrop-blur-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Active Jobs
                </p>
                <p className="text-2xl font-black">{jobs.length}</p>
              </div>
              <div className="bg-muted/50 border border-border px-5 py-2 rounded-2xl backdrop-blur-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  Revenue Hub
                </p>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  $
                  {jobs
                    .reduce((sum, j) => sum + (j.price || 0), 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* 3. CALENDAR HERO */}
          {/* Replaced ring-white/5 with a softer shadow/ring for light mode */}
          <div className="rounded-[2.5rem] border border-border bg-card p-2 md:p-4 shadow-2xl dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/5 overflow-hidden">
            <JobCalendar jobs={jobs} />
          </div>
          {/* 4. QUICK FOOTER */}
          <div className="flex justify-center pt-8">
            <Badge
              variant="outline"
              className="border-border text-muted-foreground font-mono text-[10px] px-4 py-1"
            >
              System Online // v1.0.0-beta
            </Badge>
          </div>
        </section>
      </main>
    </div>
  );
}

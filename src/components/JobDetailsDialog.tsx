"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectedJob } from "@/types/calendar";

interface Props {
  job: SelectedJob | null;
  onClose: () => void;
}

export function JobDetailsDialog({ job, onClose }: Props) {
  // If no job is selected, don't render anything
  if (!job) return null;

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent className="bg-background/95 backdrop-blur-2xl border-border/50 text-foreground shadow-3xl max-w-md rounded-[2rem] overflow-hidden p-0 border">
        {/* Top Status Bar indicator */}
        <div
          className={`h-2 w-full ${
            job.status === "COMPLETED"
              ? "bg-emerald-500"
              : job.status === "SCHEDULED"
              ? "bg-blue-500"
              : "bg-zinc-500"
          }`}
        />

        <div className="p-8">
          <DialogHeader>
            <div className="flex items-center justify-between mb-6">
              <Badge
                className={`px-4 py-1 rounded-full border-none font-bold text-[10px] uppercase tracking-tighter ${
                  job.status === "COMPLETED"
                    ? "bg-emerald-500 text-white"
                    : job.status === "SCHEDULED"
                    ? "bg-blue-500 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {job.status}
              </Badge>
              <span className="text-[10px] font-black text-muted-foreground/50 tracking-[0.2em] uppercase">
                {/* Stable ID generator using title length and price */}
                REF_ID_{job.title.length}
                {job.price.toFixed(0)}
              </span>
            </div>

            <DialogTitle className="text-4xl font-black tracking-tighter leading-none mb-8 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              {job.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Address Card */}
            <div className="group flex items-center gap-5 bg-muted/30 hover:bg-muted/50 p-4 rounded-2xl border border-border/50 transition-colors">
              <div className="h-12 w-12 rounded-xl bg-background shadow-inner flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                📍
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  Destination
                </span>
                <span className="text-sm font-bold truncate">
                  {job.address || "Field Location Not Set"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Price Card */}
              <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">
                  Contract Value
                </span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  ${job.price?.toFixed(2)}
                </span>
              </div>
              {/* Date Card */}
              <div className="bg-muted/30 p-4 rounded-2xl border border-border/50">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block mb-1">
                  Deployment
                </span>
                <span className="text-sm font-bold">
                  {job.start
                    ? job.start.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "TBD"}
                </span>
              </div>
            </div>

            {/* Time Slot Detail */}
            <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex flex-col items-center text-center">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-2">
                Expected Arrival
              </span>
              <p className="text-base font-bold italic font-mono">
                {job.start
                  ? job.start.toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "STANDBY"}
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <Button
              variant="ghost"
              className="flex-1 rounded-xl text-xs font-black uppercase tracking-widest h-14"
              onClick={onClose}
            >
              Dismiss
            </Button>
            <Link href="/dispatch" className="flex-[2]">
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl font-black uppercase tracking-widest text-[10px] h-14 shadow-xl">
                Open Dispatch
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

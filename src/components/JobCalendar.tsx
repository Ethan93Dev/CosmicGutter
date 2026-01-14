"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Job } from "../generated/prisma";
import { JobDetailsDialog } from "./JobDetailsDialog";
import { SelectedJob } from "@/types/calendar";

export default function JobCalendar({ jobs }: { jobs: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<SelectedJob | null>(null);

  const events = jobs.map((job) => ({
    id: job.id.toString(),
    title: job.description,
    start: job.scheduledFor ?? undefined,
    extendedProps: {
      address: job.address,
      status: job.status,
      price: job.price,
    },
    // Adding dynamic classes based on status
    className: `status-${job.status.toLowerCase()}`,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6 font-sans">
      <div className="max-w-300 mx-auto space-y-10">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">
              Fleet <span className="text-primary/50">Ops</span>
            </h1>
            <p className="text-muted-foreground font-medium tracking-tight">
              Real-time dispatch and scheduling overview.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-secondary/50 p-2 rounded-2xl border border-border/50 backdrop-blur-sm">
            <LegendItem label="Scheduled" color="bg-blue-500" />
            <LegendItem label="Completed" color="bg-emerald-500" />
            <LegendItem label="Pending" color="bg-amber-500" />
          </div>
        </header>

        {/* Calendar Container */}
        <main className="relative bg-card border border-border rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden p-4 md:p-8">
          <style jsx global>{`
            /* FullCalendar Modern Overrides */
            .fc {
              --fc-border-color: var(--border);
              --fc-button-bg-color: var(--color-blue-700);
              --fc-button-border-color: var(--border);
              --fc-button-hover-bg-color: var(--accent);
              --fc-button-active-bg-color: var(--primary);
              --fc-button-active-text-color: var(--primary-foreground);
            }
            .fc .fc-toolbar-title {
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: -0.02em;
              font-size: 1.25rem;
            }
            .fc .fc-button {
              border-radius: 12px;
              font-weight: 600;
              text-transform: capitalize;
              padding: 0.5rem 1rem;
              transition: all 0.2s;
            }
            .fc .fc-col-header-cell {
              padding: 12px 0;
              font-weight: 700;
              text-transform: uppercase;
              font-size: 0.75rem;
              color: var(--muted-foreground);
            }
            .fc .fc-daygrid-day {
              transition: background 0.2s;
            }
            .fc .fc-daygrid-day:hover {
              background: var(--muted) / 30;
            }
            .fc .fc-daygrid-event {
              border: none !important;
              padding: 4px 8px !important;
              border-radius: 8px !important;
              font-size: 0.75rem !important;
              font-weight: 600 !important;
              margin: 2px 4px !important;
            }

            /* Status Specific Styles */
            .status-scheduled {
              background-color: oklch(0.705 0.15 250 / 0.2) !important;
              color: oklch(0.5 0.2 250) !important;
              border-left: 4px solid oklch(0.5 0.2 250) !important;
            }
            .status-completed {
              background-color: oklch(0.705 0.15 160 / 0.2) !important;
              color: oklch(0.5 0.2 160) !important;
              border-left: 4px solid oklch(0.5 0.2 160) !important;
            }

            .fc-theme-standard td,
            .fc-theme-standard th {
              border-color: var(--border) !important;
            }
            .fc-scrollgrid {
              border-radius: 20px;
              overflow: hidden;
              border: 1px solid var(--border) !important;
            }
          `}</style>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            events={events}
            eventClick={(info) => {
              setSelectedJob({
                title: info.event.title,
                address: info.event.extendedProps.address,
                status: info.event.extendedProps.status,
                start: info.event.start,
                price: info.event.extendedProps.price,
              });
            }}
            height="auto"
          />
        </main>
      </div>

      <JobDetailsDialog
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
      />
    </div>
  );
}

function LegendItem({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-background/50 transition-colors">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">
        {label}
      </span>
    </div>
  );
}

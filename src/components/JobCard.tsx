"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteJob, updateJob, toggleJobStatus } from "@/app/actions";
// Import the joined type if possible, otherwise use 'any' for the joined object
import { Job, Customer } from "@/generated/prisma";

// Define a type that includes the customer relation
type JobWithCustomer = Job & {
  customer: Customer;
};

export function JobCard({ job }: { job: JobWithCustomer }) {
  return (
    <Card className="border-border bg-card hover:border-primary/30 transition-all duration-300 shadow-sm dark:shadow-xl relative group">
      {/* DELETE BUTTON */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <form action={deleteJob}>
          <input type="hidden" name="id" value={job.id} />
          <Button
            type="submit"
            variant="ghost"
            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
          >
            ✕
          </Button>
        </form>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold tracking-tight">
              {job.description}
            </CardTitle>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
              {/* Accessing customer through the job object */}
              {job.customer
                ? `${job.customer.firstName} ${job.customer.lastName}`
                : "Unassigned Customer"}
            </p>
          </div>

          <form action={toggleJobStatus}>
            <input type="hidden" name="id" value={job.id} />
            <input type="hidden" name="status" value={job.status} />
            <button
              type="submit"
              className="active:scale-95 transition-transform"
            >
              <Badge
                className={`border-none px-2 py-0.5 text-[10px] font-bold uppercase cursor-pointer ${
                  job.status === "COMPLETED"
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20"
                    : job.status === "SCHEDULED"
                    ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/20"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {job.status.toLowerCase()}
              </Badge>
            </button>
          </form>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* INFO BOX */}
        <div className="text-xs space-y-2 text-muted-foreground bg-secondary/30 p-3 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <span className="text-sm">📍</span>
            <span className="truncate">
              {job.address || "No address provided"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">📅</span>
            <span>
              {job.scheduledFor
                ? new Date(job.scheduledFor).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : "Not scheduled"}
            </span>
          </div>
        </div>

        {/* EDIT DETAILS */}
        <details className="group/edit">
          <summary className="text-[11px] font-bold text-muted-foreground cursor-pointer hover:text-blue-600 list-none flex items-center gap-1 transition-colors">
            <span className="group-open/edit:rotate-90 transition-transform text-[8px]">
              ▶
            </span>
            EDIT DETAILS
          </summary>
          <form
            action={updateJob}
            className="mt-3 space-y-3 bg-muted/50 p-3 rounded-lg border border-border"
          >
            <input type="hidden" name="id" value={job.id} />
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">
                Description
              </label>
              <input
                name="description"
                defaultValue={job.description}
                className="w-full bg-background text-xs p-2 rounded border border-input outline-none focus:border-blue-500"
              />
            </div>
            {/* Inside your <details> form in JobCard.tsx */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">
                Scheduled Date
              </label>
              <input
                name="scheduledFor"
                type="datetime-local"
                // Format the date so the input can display the existing value
                defaultValue={
                  job.scheduledFor
                    ? new Date(job.scheduledFor).toISOString().slice(0, 16)
                    : ""
                }
                className="w-full bg-background text-xs p-2 rounded border border-input outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-muted-foreground">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={job.price || 0}
                className="w-full bg-background text-xs p-2 rounded border border-input outline-none focus:border-blue-500"
              />
            </div>
            <Button
              size="sm"
              className="w-full h-8 text-[11px] bg-blue-600 hover:bg-blue-500 font-bold text-white"
            >
              Save Changes
            </Button>
          </form>
        </details>

        {/* FOOTER */}
        <div className="flex items-end justify-between pt-2 border-t border-border">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
              Balance
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-green-400">
              ${job.price?.toFixed(2)}
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground font-mono">
            #{job.id}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

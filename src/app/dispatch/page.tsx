import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JobForm } from "@/components/JobForm";
import { JobFeed } from "@/components/JobFeed"; // Or your inline Feed logic
import { JobCard } from "@/components/JobCard";

export default async function DispatchPage() {
  // 1. Fetch BOTH jobs and customers
  const [jobs, customers] = await Promise.all([
    db.job.findMany({
      include: { customer: true },
      orderBy: { id: "desc" },
    }),
    db.customer.findMany({
      orderBy: { firstName: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans p-4 lg:p-8 transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-primary text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schedule
        </Link>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
          {/* 2. Pass customers to the JobForm prop */}
          <JobForm customers={customers} />

          <div className="xl:col-span-3 space-y-6">
            <h2 className="text-xl font-bold px-1 text-muted-foreground">
              Active Feed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

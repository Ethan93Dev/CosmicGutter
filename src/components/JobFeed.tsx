import { JobCard } from "./JobCard";
import { Job, Customer } from "@/generated/prisma";

// 1. Define the same joined type that JobCard uses
type JobWithCustomer = Job & {
  customer: Customer;
};

interface JobFeedProps {
  // 2. Update this to use the joined type
  jobs: JobWithCustomer[];
}

export function JobFeed({ jobs }: JobFeedProps) {
  return (
    <div className="xl:col-span-3 space-y-6">
      <h2 className="text-xl font-bold px-1 text-muted-foreground">
        Active Feed
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          // Now TypeScript knows 'job' has a 'customer' property inside it
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-border rounded-3xl opacity-50">
          <p className="text-sm font-bold uppercase tracking-widest">
            No Active Deployments
          </p>
        </div>
      )}
    </div>
  );
}

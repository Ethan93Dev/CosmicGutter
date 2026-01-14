import { Button } from "@/components/ui/button";
import { createJob } from "@/app/actions";
import { Customer } from "@/generated/prisma";

export function JobForm({ customers }: { customers: Customer[] }) {
  return (
    <aside className="xl:col-span-1">
      <div className="sticky top-8 space-y-6">
        <h1 className="text-3xl font-black uppercase tracking-tighter">
          Dispatch
        </h1>

        <form
          action={createJob}
          className="flex flex-col gap-4 bg-muted/30 p-6 rounded-2xl border border-border shadow-sm dark:shadow-xl"
        >
          {/* CUSTOMER ASSIGNMENT */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
              Assign Customer
            </label>
            <select
              name="customerId"
              required
              className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
            >
              <option value="">Select a customer...</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </select>
          </div>

          {/* WORK DESCRIPTION */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
              Work Description
            </label>
            <input
              name="description"
              placeholder="e.g. Gutter Cleaning"
              className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          {/* LOCATION */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
              Location
            </label>
            <input
              name="address"
              placeholder="123 Street Ave"
              className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* DATE & TIME (The Missing Field) */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
              Scheduled For
            </label>
            <input
              name="scheduledFor"
              type="datetime-local"
              className="w-full h-11 rounded-lg border border-input bg-background px-3 text-xs outline-none focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* PRICE */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-muted-foreground uppercase ml-1">
              Price ($)
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest py-6 mt-2 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            Deploy Job
          </Button>
        </form>
      </div>
    </aside>
  );
}

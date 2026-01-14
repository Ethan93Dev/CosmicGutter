import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function createCustomerAction(formData: FormData) {
    "use server";
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    await db.customer.create({
      data: { firstName, lastName, email, phone },
    });
    redirect("/dispatch");
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        action={createCustomerAction}
        className="w-full max-w-md space-y-4 bg-card p-8 rounded-3xl border border-border shadow-2xl"
      >
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          Join the Fleet
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name"
            required
            className="bg-muted p-3 rounded-xl outline-none"
          />
          <input
            name="lastName"
            placeholder="Last Name"
            required
            className="bg-muted p-3 rounded-xl outline-none"
          />
        </div>
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          className="w-full bg-muted p-3 rounded-xl outline-none"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full bg-muted p-3 rounded-xl outline-none"
        />
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all">
          Create My Customer Profile
        </button>
      </form>
    </div>
  );
}

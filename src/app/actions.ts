"use server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { JobStatus } from "@/generated/prisma";

export async function createJob(formData: FormData) {
  const description = formData.get("description") as string;
  const address = formData.get("address") as string;
  const price = parseFloat(formData.get("price") as string);
  const customerId = parseInt(formData.get("customerId") as string); // Get the ID from the form

  await db.job.create({
    data: {
      description,
      address,
      price,
      customerId, // This links the job to the person!
      status: "SCHEDULED",
    },
  });

  revalidatePath("/dispatch");
}

export async function updateJob(formData: FormData) {
  const id = Number(formData.get("id"));
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string) || 0;

  // 1. Get the raw string from the input
  const scheduledForRaw = formData.get("scheduledFor") as string;

  // 2. Convert to Date object (or null if empty)
  const scheduledFor = scheduledForRaw ? new Date(scheduledForRaw) : null;

  await db.job.update({
    where: { id },
    data: {
      description,
      price,
      scheduledFor, // Prisma now receives a Date object
    },
  });

  revalidatePath("/dispatch"); // Make sure this matches your route
}

export async function toggleJobStatus(formData: FormData) {
  const id = Number(formData.get("id"));
  const currentStatus = formData.get("status") as string;

  // Logic: PENDING -> SCHEDULED -> COMPLETED -> PENDING
  let newStatus;
  if (currentStatus === "PENDING") newStatus = "SCHEDULED";
  else if (currentStatus === "SCHEDULED") newStatus = "COMPLETED";
  else newStatus = "PENDING";

  await db.job.update({
    where: { id },
    data: { status: newStatus as JobStatus },
  });

  revalidatePath("/");
}

export async function deleteJob(formData: FormData) {
  const idString = formData.get("id") as string;
  if (!idString) return;

  const id = parseInt(idString);

  await db.job.delete({
    where: { id },
  });

  revalidatePath("/");
}

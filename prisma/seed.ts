import { db } from "../src/lib/db";

async function main() {
  // We use a unique email to avoid "Unique constraint" errors
  const email = `ethan.${Date.now()}@test.com`;

  const customer = await db.customer.create({
    data: {
      firstName: "Ethan",
      lastName: "Test",
      email: email,
      jobs: {
        create: [
          {
            description: "Gutter Clean",
            address: "2323 test",
            price: 232.99,
            status: "SCHEDULED",
            scheduledFor: new Date("2026-01-16T14:42:16.000Z"),
          },
        ],
      },
    },
  });
  console.log("✅ Inserted Job for:", customer.firstName);
}

main()
  .catch((e) => console.error(e))
  .finally(() => db.$disconnect());

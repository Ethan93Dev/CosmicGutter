import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg"; // <--- Add this line!
import { PrismaClient } from "@/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// Use pg.Pool from the import above
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const db = new PrismaClient({ adapter });

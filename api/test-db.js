import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL?.replace("/Quiz?", "/postgres?"), // Try connecting to default DB
    },
  },
});

async function main() {
  try {
    console.log("Attempting to connect with provided credentials...");
    await prisma.$connect();
    console.log(
      '✅ Connection successful to "postgres" database! Credentials are correct.',
    );
    console.log(
      '❌ If migration failed, it means the "Quiz" database does not exist.',
    );
  } catch (e) {
    console.error("❌ Connection failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

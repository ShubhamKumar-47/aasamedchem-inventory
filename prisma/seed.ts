import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {

  const password = await bcrypt.hash(
    "Password@123",
    10
  );

  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@aasa.com",
      password,
      role: "ADMIN",
    },
  });

  await prisma.user.create({
    data: {
      name: "Seller",
      email: "seller@aasa.com",
      password,
      role: "SELLER",
    },
  });

  console.log("Users Created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function serviceSeed() {
  console.log("Seeding products...");

  await prisma.product.createMany({
    data: [
      { name: "Project Alpha", description: "A react project." },
      { name: "Project Beta", description: "A node project." },
      { name: "New Project 1", description: "Project 1 Test" },
      { name: "Just Test Project 2", description: "Test Proj 2 Desc" },
      { name: "Apollo", description: "Apollo Projects 1" },
      { name: "James Web Telescope", description: "Astronomy Project 1" },
    ],
  });

  console.log("Products seeded successfully.");

  console.log("Seeding users...");

  const users = [
    { name: "John Doe", email: "john@example.com", password: "password123" },
    { name: "Jane Smith", email: "jane@example.com", password: "securePass!" },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  console.log("Users seeded successfully.");

  await prisma.$disconnect();
}

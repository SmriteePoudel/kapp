const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@someone.com";
  const adminPassword = await bcrypt.hash("admin123", 10);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: adminPassword,
        role: "ADMIN",
        name: "Admin",
      },
    });
    console.log("Admin user created.");
  } else {
    await prisma.user.update({
      where: { email: adminEmail },
      data: {
        password: adminPassword,
        role: "ADMIN",
        name: "Admin Updated",
      },
    });
    console.log("Admin user updated.");
  }

  const userEmail = "user@someone.com";
  const userPassword = await bcrypt.hash("user123", 10);

  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email: userEmail,
        password: userPassword,
        role: "USER",
        name: "User",
      },
    });
    console.log("User created.");
  } else {
    await prisma.user.update({
      where: { email: userEmail },
      data: {
        password: userPassword,
        role: "USER",
        name: "User Updated",
      },
    });
    console.log("User updated.");
  }
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const email = "admin@someone.com";
  const password = "admin123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (!existing) {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roles: ["ADMIN"],
        name: "Admin",
      },
    });
    console.log("Admin user created.");
  } else {
    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        roles: ["ADMIN"],
        name: "Admin",
      },
    });
    console.log("Admin user updated.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

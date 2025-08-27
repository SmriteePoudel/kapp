const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      email: "admin@someone.com",
      password: await bcrypt.hash("admin123", 10),
      name: "Admin User",
      roles: ["ADMIN"],
      birthday: new Date("1990-01-15"),
    },
    {
      email: "user@someone.com",
      password: await bcrypt.hash("user123", 10),
      name: "Regular User",
      roles: ["USER"],
      birthday: new Date("1995-08-28"),
    },
    {
      email: "ram@someone.com",
      password: await bcrypt.hash("ram123", 10),
      name: "Ram Bahadur Khanal",
      roles: ["USER"],
      birthday: new Date("2000-09-02"),
    },
    {
      email: "sita@someone.com",
      password: await bcrypt.hash("sita123", 10),
      name: "Sita Devi Khanal",
      roles: ["USER"],
      birthday: new Date("1998-08-30"),
    },
    {
      email: "prakash@someone.com",
      password: await bcrypt.hash("prakash123", 10),
      name: "Prakash Khanal",
      roles: ["USER"],
      birthday: new Date("1992-09-01"),
    },
  ];

  for (const user of users) {
    const existing = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existing) {
      await prisma.user.update({
        where: { email: user.email },
        data: {
          password: user.password,
          name: user.name,
          roles: user.roles,
          birthday: user.birthday,
        },
      });
      console.log(`🔁 Updated: ${user.email}`);
    } else {
      await prisma.user.create({ data: user });
      console.log(`✅ Created: ${user.email}`);
    }
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { colors, categories } from "@/lib/data"
import { prisma } from "@/lib/prisma"

async function main() {
  await prisma.color.createMany({
    data: colors.map((color) => ({
      name: color.name,
      label: color.label,
      value: color.value,
    })),
    skipDuplicates: true,
  })

  await prisma.category.createMany({
    data: categories.map((category) => ({
      name: category.name,
      label: category.label,
    })),
    skipDuplicates: true,
  })

  await prisma.user.upsert({
    where: { email: "test@email.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@email.com",
      password: "$2b$12$r6ALbz/DLYZ0ZDH98QUAPuuW9iL6DkksUzWbesiBH72x/u2Ytsfay",
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())

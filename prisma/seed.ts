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
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())

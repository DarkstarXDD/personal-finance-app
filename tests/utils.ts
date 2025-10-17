import { faker } from "@faker-js/faker"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"

// ============================================
// ============ Create Login User =============
// ============================================

export async function createLoginUser() {
  const name = faker.person.fullName()
  const email = faker.internet.email().toLowerCase()
  const password = faker.internet.password()

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, email: true },
  })

  return { ...user, passwordInPlainText: password }
}

import { faker } from "@faker-js/faker"
import bcrypt from "bcryptjs"

import { prisma } from "@/lib/prisma"

// ============================================
// ============ Create Dummy User =============
// ============================================
export function createDummyUserData() {
  const name = faker.person.fullName()
  const email = faker.internet.email().toLowerCase()
  const password = faker.internet.password()

  return { name, email, password }
}

export async function createDummyUser() {
  const { name, email, password } = createDummyUserData()

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: { id: true, name: true, email: true },
  })

  return { ...user, password: password }
}

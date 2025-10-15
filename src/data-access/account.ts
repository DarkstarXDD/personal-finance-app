import "server-only"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { cache } from "react"

import { verifySession } from "@/data-access/auth"
import { prisma } from "@/lib/prisma"
import {
  DALReturn,
  EmailUpdateErrors,
  NameUpdateErrors,
  PasswordUpdateErrors,
} from "@/lib/types"

// ============================================
// ============== Fetch User Data =============
// ============================================

export const getUser = cache(async () => {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true },
  })
  if (!user) redirect("/login")
  return user
})

// ============================================
// ================ Update Name ===============
// ============================================

export async function updateName({
  name,
}: {
  name: string
}): Promise<DALReturn<NameUpdateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name },
    })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      fieldErrors: { name: ["Error updating name."] },
    }
  }
}

// ============================================
// ================ Update Email ==============
// ============================================

export async function updateEmail({
  email,
}: {
  email: string
}): Promise<DALReturn<EmailUpdateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { email },
    })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      fieldErrors: { email: ["Error updating email."] },
    }
  }
}

// ============================================
// ============== Update Password =============
// ============================================

export async function updatePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string
  newPassword: string
}): Promise<DALReturn<PasswordUpdateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    })

    if (!user) {
      redirect("/login")
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid)
      return {
        success: false,
        fieldErrors: { currentPassword: ["Incorrect password."] },
      }

    const newPasswordHashed = await bcrypt.hash(newPassword, 12)

    await prisma.user.update({
      where: { id: userId },
      data: { password: newPasswordHashed },
    })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      fieldErrors: { currentPassword: ["Error updating password."] },
    }
  }
}

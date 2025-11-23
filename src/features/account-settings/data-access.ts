import "server-only"

import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { cache } from "react"

import { verifySession } from "@/data-access/auth"
import { DEMO_ACCOUNT_ERROR_MESSAGE } from "@/lib/constants"
import { prisma } from "@/lib/prisma"

import type {
  DALReturn,
  DALDeleteItemReurn,
  EmailUpdateErrors,
  NameUpdateErrors,
  PasswordUpdateErrors,
} from "@/lib/types"

// ============================================
// ============== Fetch User Data =============
// ============================================

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
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
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { name: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.userId },
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
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { email: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    await prisma.user.update({
      where: { id: session.userId },
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
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { currentPassword: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
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
      where: { id: session.userId },
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

// ============================================
// ============== Delete Account ==============
// ============================================

export async function deleteAccount(): Promise<DALDeleteItemReurn> {
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      message:
        "You are not allowed to delete the demo account. Please create a free account to manage your own data.",
    }
  }

  try {
    await prisma.user.delete({ where: { id: session.userId } })
    return { success: true }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: "Error deleting account. Please try again.",
    }
  }
}

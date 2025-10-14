import "server-only"

import { redirect } from "next/navigation"
import { cache } from "react"

import { verifySession } from "@/data-access/auth"
import { prisma } from "@/lib/prisma"
import { DALReturn, NameUpdateErrors } from "@/lib/types"

// ============================================
// ============== Fetch User Data =============
// ============================================

export const getUser = cache(async () => {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  console.log("Fetch ran")

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

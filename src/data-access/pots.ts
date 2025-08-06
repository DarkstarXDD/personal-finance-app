import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma } from "@/lib/prisma"
import { PotSchema } from "@/lib/schemas"

export async function createNewPot(formData: PotSchema) {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.create({
      data: {
        userId,
        name: formData.name,
        target: formData.target,
        colorId: formData.theme,
      },
    })
    return { success: true }
  } catch {
    return { success: false }
  }
}

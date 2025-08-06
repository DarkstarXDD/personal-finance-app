import "server-only"
import { redirect } from "next/navigation"
import { cache } from "react"

import { verifySession } from "@/data-access/auth"
import { Color } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

export type Colors = Color[]

export const getColors = cache(async () => {
  const userId = await verifySession()
  if (!userId) redirect("/login")
  return prisma.color.findMany()
})

import "server-only"
import { cache } from "react"

import { Color } from "@/generated/prisma"
import { prisma } from "@/lib/prisma"

export type Colors = Color[]

export const getColors = cache(async () => {
  return prisma.color.findMany()
})

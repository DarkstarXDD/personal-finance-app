import "server-only"
import { cache } from "react"

import { prisma, Prisma } from "@/lib/prisma"

export const getColors = cache(async () => {
  return prisma.color.findMany()
})
export type Color = Prisma.ColorGetPayload<object>

export const getCategories = cache(async () => {
  return prisma.category.findMany()
})
export type Category = Prisma.CategoryGetPayload<object>

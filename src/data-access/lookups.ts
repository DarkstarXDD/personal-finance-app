import "server-only"
import { cache } from "react"

import { prisma, Prisma } from "@/lib/prisma"

export type Color = Prisma.ColorGetPayload<object>

export const getColors = cache(async () => {
  return prisma.color.findMany({ orderBy: { label: "asc" } })
})

export type Category = Prisma.CategoryGetPayload<object>

export const getCategories = cache(async () => {
  return prisma.category.findMany({ orderBy: { label: "asc" } })
})

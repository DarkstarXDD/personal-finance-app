import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma, Prisma } from "@/lib/prisma"
import { PotSchema, PotWithIdSchema } from "@/lib/schemas"

import type { CreateNewPotErrors, DALReturn } from "@/lib/types"

export async function createNewPot(
  formData: PotSchema
): Promise<DALReturn<CreateNewPotErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.create({
      data: {
        userId,
        name: formData.name,
        target: formData.target,
        colorId: formData.color,
      },
    })
    return { success: true }
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { name: ["A pot with this name already exists."] },
      }
    }
    return {
      success: false,
      fieldErrors: { name: ["Error creating pot. Please try again"] },
    }
  }
}

export async function getPots() {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const pots = await prisma.pot.findMany({
    where: { userId },
    omit: { updatedAt: true, colorId: true, userId: true, createdAt: true },
    include: { color: { select: { id: true, value: true } } },
  })
  return pots
}

export async function editPot(
  formData: PotWithIdSchema
): Promise<DALReturn<CreateNewPotErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.update({
      where: { userId: userId, id: formData.potId },
      data: {
        name: formData.name,
        target: formData.target,
        colorId: formData.color,
      },
    })
    return { success: true }
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return {
        success: false,
        fieldErrors: { name: ["A pot with this name already exists."] },
      }
    }
    return {
      success: false,
      fieldErrors: { name: ["Error updating pot. Please try again"] },
    }
  }
}

export async function deletePot(potId: string): Promise<{ success: boolean }> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.delete({ where: { id: potId, userId } })
    return { success: true }
  } catch {
    return { success: false }
  }
}

import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma, Prisma } from "@/lib/prisma"

import type { PotSchema, PotCreate, PotUpdateSchema } from "@/lib/schemas"
import type { PotCreateErrors, DALReturn, PotUpdateErrors } from "@/lib/types"

// ============================================
// ================ Create Pot ================
// ============================================

export async function createPot({
  name,
  target,
  colorId,
}: PotCreate): Promise<DALReturn<PotCreateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.create({
      data: {
        userId,
        name: name,
        target: target,
        colorId: colorId,
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
  formData: Omit<PotSchema, "currentAmount" | "colorValue">
): Promise<DALReturn<PotCreateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.update({
      where: { userId: userId, id: formData.potId },
      data: {
        name: formData.name,
        target: formData.target,
        colorId: formData.colorId,
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

export async function updatePotAmount(
  formData: PotUpdateSchema,
  operation: "increment" | "decrement"
): Promise<DALReturn<PotUpdateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  const { potId, amountToUpdate } = formData

  try {
    const amountToUpdateAsDecimal = new Prisma.Decimal(amountToUpdate)

    await prisma.pot.update({
      where: { userId, id: potId },
      data: { currentAmount: { [operation]: amountToUpdateAsDecimal } },
    })
    return { success: true }
  } catch {
    return {
      success: false,
      fieldErrors: {
        amountToUpdate: ["Error updating pot. Please try again."],
      },
    }
  }
}

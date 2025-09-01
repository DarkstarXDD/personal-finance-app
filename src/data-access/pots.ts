import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { prisma, Prisma } from "@/lib/prisma"

import type { PotAmountUpdate, PotCreate, PotUpdate } from "@/lib/schemas"
import type {
  PotCreateErrors,
  DALReturn,
  PotAmountUpdateErrors,
} from "@/lib/types"

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

// ============================================
// ================ Update Pot ================
// ============================================

export async function UpdatePot({
  id,
  name,
  target,
  colorId,
}: PotUpdate): Promise<DALReturn<PotCreateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    await prisma.pot.update({
      where: { userId, id },
      data: {
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
      fieldErrors: { name: ["Error updating pot. Please try again."] },
    }
  }
}

// ============================================
// ================ Delete Pot ================
// ============================================

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

// ============================================
// ============= Update Pot Amount ============
// ============================================

export async function updatePotAmount(
  { id, amountToUpdate }: PotAmountUpdate,
  operation: "increment" | "decrement"
): Promise<DALReturn<PotAmountUpdateErrors>> {
  const userId = await verifySession()
  if (!userId) redirect("/login")

  try {
    const amountToUpdateAsDecimal = new Prisma.Decimal(amountToUpdate)

    await prisma.pot.update({
      where: { userId, id },
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

import "server-only"

import { redirect } from "next/navigation"

import { verifySession } from "@/data-access/auth"
import { DEMO_ACCOUNT_ERROR_MESSAGE } from "@/lib/constants"
import { prisma, Prisma } from "@/lib/prisma"

import type {
  PotAmountUpdate,
  PotCreate,
  PotUpdate,
} from "@/features/pots/schemas"
import type {
  DALReturn,
  PotCreateErrors,
  DALDeleteItemReurn,
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
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { name: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    await prisma.pot.create({
      data: {
        userId: session.userId,
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

export async function updatePot({
  id,
  name,
  target,
  colorId,
}: PotUpdate): Promise<DALReturn<PotCreateErrors>> {
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { name: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    await prisma.pot.update({
      where: { userId: session.userId, id },
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

export async function deletePot(potId: string): Promise<DALDeleteItemReurn> {
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      message: DEMO_ACCOUNT_ERROR_MESSAGE,
    }
  }

  try {
    await prisma.pot.delete({ where: { id: potId, userId: session.userId } })
    return { success: true }
  } catch {
    return { success: false, message: "Error deleting pot. Please try agian." }
  }
}

// ============================================
// ============= Update Pot Amount ============
// ============================================

export async function updatePotAmount(
  { id, amountToUpdate }: PotAmountUpdate,
  operation: "increment" | "decrement"
): Promise<DALReturn<PotAmountUpdateErrors>> {
  const session = await verifySession()
  if (!session) redirect("/login")

  if (session.role === "DEMO") {
    return {
      success: false,
      fieldErrors: { amountToUpdate: [DEMO_ACCOUNT_ERROR_MESSAGE] },
    }
  }

  try {
    const amountToUpdateAsDecimal = new Prisma.Decimal(amountToUpdate)

    await prisma.pot.update({
      where: { userId: session.userId, id },
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

// ============================================
// ================ Fetch Pots ================
// ============================================

const potSelect = {
  id: true,
  name: true,
  target: true,
  currentAmount: true,
  color: true,
} satisfies Prisma.PotSelect

type PotRaw = Prisma.PotGetPayload<{ select: typeof potSelect }>

export type Pot = Omit<PotRaw, "target" | "currentAmount"> & {
  target: number
  currentAmount: number
}

export type PotsSummary = {
  count: number
  totalSavedAmount: number
  totalTargetAmount: number
}

export async function getPots(take?: number) {
  const session = await verifySession()
  if (!session) redirect("/login")

  // await new Promise((resolve) => setTimeout(resolve, 2000))

  const [pots, aggregates] = await prisma.$transaction([
    prisma.pot.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: "desc" },
      take: take,
      select: potSelect,
    }),

    prisma.pot.aggregate({
      where: { userId: session.userId },
      _sum: { currentAmount: true, target: true },
      _count: true,
    }),
  ])

  const normalizedPots: Pot[] = pots.map((pot) => ({
    ...pot,
    target: pot.target.toNumber(),
    currentAmount: pot.currentAmount.toNumber(),
  }))

  return {
    pots: normalizedPots,
    potsSummary: {
      count: aggregates._count,
      totalSavedAmount: aggregates._sum.currentAmount?.toNumber() ?? 0,
      totalTargetAmount: aggregates._sum.target?.toNumber() ?? 0,
    },
  }
}

import { prisma } from "@/lib/prisma"
import { currencyFormatter } from "@/lib/utils"

import { test, expect } from "./fixtures/fixtures"

test.describe("Pots Page", () => {
  test("renders empty state", async ({ potsPage }) => {
    await expect(potsPage.heading).toBeVisible()
    await expect(potsPage.emptyState).toBeVisible()
    await expect(potsPage.addPotButton).toBeVisible()
  })

  test("shows form errors on empty submit", async ({ potsPage }) => {
    await potsPage.addPotButton.click()
    await expect(potsPage.dialogHeading).toBeVisible()
    await potsPage.nameInput.fill("")
    await potsPage.targetInput.fill("")
    await potsPage.addPotSubmit.click()

    await potsPage.expectErrorMessage("Name cannot be empty.")
    await potsPage.expectErrorMessage("Target cannot be empty.")
    await potsPage.expectErrorMessage("Please select a color.")
  })

  test("can create a pot", async ({ potsPage }) => {
    const colors = await prisma.color.findMany()
    const colorLabel = colors[0].label
    const potName = "Vacation Fund"
    const targetAmount = 150

    await potsPage.addPotButton.click()
    await potsPage.nameInput.fill(potName)
    await potsPage.targetInput.fill(targetAmount.toString())
    await potsPage.selectTheme(colorLabel)
    await potsPage.addPotSubmit.click()

    await expect(potsPage.potHeading(potName)).toBeVisible()
    await expect(potsPage.potSavedAmount(potName)).toHaveText(
      currencyFormatter.format(0)
    )
    await expect(potsPage.potTargetAmount(potName)).toHaveText(
      currencyFormatter.format(targetAmount)
    )
  })

  test("can edit a pot", async ({ userSession, potsPage }) => {
    const colors = await prisma.color.findMany()
    const [primary, secondary] = colors

    await prisma.pot.create({
      data: {
        userId: userSession.userId,
        name: "Travel Pot",
        target: 100,
        currentAmount: 25,
        colorId: primary.id,
      },
    })

    await potsPage.page.reload()
    await potsPage.potOptionsButton("Travel Pot").click()
    await potsPage.editMenuItem.click()
    await expect(potsPage.editDialogHeading).toBeVisible()

    await potsPage.nameInput.fill("Updated Pot")
    await potsPage.targetInput.fill("250")
    await potsPage.selectTheme((secondary ?? primary).label)
    await potsPage.editDialogSaveButton.click()

    await expect(potsPage.potHeading("Updated Pot")).toBeVisible()
    await expect(potsPage.potTargetAmount("Updated Pot")).toHaveText(
      currencyFormatter.format(250)
    )
  })

  test("can add funds to a pot", async ({ userSession, potsPage }) => {
    const colors = await prisma.color.findMany()

    await prisma.pot.create({
      data: {
        userId: userSession.userId,
        name: "Rainy Day",
        target: 200,
        currentAmount: 50,
        colorId: colors[0].id,
      },
    })

    await potsPage.page.reload()
    await potsPage.addMoneyButton("Rainy Day").click()

    await potsPage.addAmountInput.fill("25")
    await potsPage.addMoneyConfirmButton.click()

    await expect(potsPage.potSavedAmount("Rainy Day")).toHaveText(
      currencyFormatter.format(75)
    )
  })

  test("can withdraw funds from a pot", async ({ userSession, potsPage }) => {
    const colors = await prisma.color.findMany()

    await prisma.pot.create({
      data: {
        userId: userSession.userId,
        name: "Emergency Fund",
        target: 500,
        currentAmount: 300,
        colorId: colors[0].id,
      },
    })

    await potsPage.page.reload()
    await potsPage.withdrawButton("Emergency Fund").click()

    await potsPage.withdrawAmountInput.fill("125")
    await potsPage.withdrawConfirmButton.click()

    await expect(potsPage.potSavedAmount("Emergency Fund")).toHaveText(
      currencyFormatter.format(175)
    )
  })

  test("can delete a pot", async ({ userSession, potsPage }) => {
    const colors = await prisma.color.findMany()

    await prisma.pot.create({
      data: {
        userId: userSession.userId,
        name: "One-off Goal",
        target: 100,
        currentAmount: 20,
        colorId: colors[0].id,
      },
    })

    await potsPage.page.reload()
    await potsPage.potOptionsButton("One-off Goal").click()
    await potsPage.deleteMenuItem.click()
    await potsPage.deleteConfirmButton.click()

    await expect(potsPage.emptyState).toBeVisible()
  })
})

import { test, expect } from "@playwright/test"

test("grab element", async ({ page }) => {
  await page.goto("http://localhost:3000/")

  await expect(
    page.getByRole("heading", { name: "Loogin", level: 1 })
  ).toBeVisible()
})

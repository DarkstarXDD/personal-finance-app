import { test, expect } from "@playwright/test"

test("test 01", () => {
  expect(5).toEqual(5)
})

test("test 02", () => {
  expect(5).toEqual(12)
})

test("test 03", () => {
  expect("Harry Potter").toContain("Potter")
})

test("test 04", () => {
  expect(true).toBeFalsy()
})

"use client"

import { Select, SelectItem } from "@/components/ui/Select"

export default function Home() {
  return (
    <main className="grid gap-4">
      <Select
        name="fruits"
        label="Fruits"
        description="Pick your favorite fruit"
        layout="vertical"
        shouldHideOnMobile={true}
      >
        <SelectItem>Entertainment</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Or</SelectItem>
      </Select>

      <Select
        name="fruits"
        label="Fruits"
        labelVariant="secondary"
        description="Pick your favorite fruit"
        layout="horizontal"
      >
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>

      <Select
        name="fruits"
        label="Fruits"
        description="Pick your favorite fruit"
        layout="vertical"
      >
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>
    </main>
  )
}

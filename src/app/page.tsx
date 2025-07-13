"use client"

import { useState } from "react"

import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  console.log(isDialogOpen)

  return (
    <main className="grid gap-10">
      <Button onPress={() => setIsDialogOpen((prev) => !prev)}>
        Open Dialog
      </Button>
      <Dialog
        title="Add New Budget"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <p className="text-grey-900">Hello, World!</p>
      </Dialog>
    </main>
  )
}

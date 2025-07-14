"use client"

import { useState } from "react"
import { DialogTrigger } from "react-aria-components"

import Button from "@/components/ui/Button"
import { Dialog } from "@/components/ui/Dialog"

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <main className="grid gap-10">
      <DialogTrigger>
        <Button>Open Dialog (Uncontrolled)</Button>
        <Dialog title="Add New Budget">
          <div className="grid gap-4">
            <p>
              This is a dialog content area. You can place any content here,
              such as forms, text, or other components.
            </p>
            <Button slot="close">Close Dialog</Button>
          </div>
        </Dialog>
      </DialogTrigger>

      {/* Controlled Dialog without the DialogTrigger */}
      <Button onPress={() => setIsDialogOpen((prev) => !prev)}>
        Open Dialog (Controlled)
      </Button>
      <Dialog
        title="Add New Budget"
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <div className="grid gap-4">
          <p>
            This is a dialog content area. You can place any content here, such
            as forms, text, or other components.
          </p>
          <Button slot="close">Close Dialog</Button>
        </div>
      </Dialog>
    </main>
  )
}

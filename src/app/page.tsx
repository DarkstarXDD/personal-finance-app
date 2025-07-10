"use client"

import Button from "@/components/ui/Button"

export default function Home() {
  return (
    <main className="grid gap-4">
      <Button className="w-full" onPress={() => console.log("Clicked!")}>
        Login
      </Button>
      <Button
        className="w-full"
        variant="secondary"
        onPress={() => console.log("Clicked!")}
      >
        Login
      </Button>
      <Button
        className="w-full"
        variant="tertiary"
        onPress={() => console.log("Clicked!")}
      >
        Login
      </Button>
      <Button
        className="w-full"
        variant="destructive"
        onPress={() => console.log("Clicked!")}
      >
        Login
      </Button>
    </main>
  )
}

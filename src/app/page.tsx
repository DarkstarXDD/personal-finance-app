"use client"

import Link from "@/components/ui/Link"

export default function Home() {
  return (
    <main className="grid gap-10">
      <Link href="/test" className="font-bold">
        This is a Link
      </Link>
      <Link href="/test" className="font-bold" withIcon={true}>
        Sign Up
      </Link>
    </main>
  )
}

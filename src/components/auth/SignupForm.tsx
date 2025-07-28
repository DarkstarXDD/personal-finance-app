"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TextField from "@/components/ui/TextField"

export default function SignupForm() {
  return (
    <Card padding="lg" className="mx-auto max-w-[35rem]">
      <div className="grid justify-items-center gap-8">
        <form className="grid w-full gap-8">
          <Heading as="h1">Sign Up</Heading>
          <div className="grid gap-4">
            <TextField label="Name" name="name" />
            <TextField label="Email" name="email" />
            <TextField
              label="Create Password"
              name="password"
              type="password"
              description="Password must be at least 8 characters"
            />
          </div>
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
        <p className="flex items-center gap-2">
          <span className="text-grey-500 text-sm leading-normal font-normal">
            Already have an account?
          </span>
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </p>
      </div>
    </Card>
  )
}

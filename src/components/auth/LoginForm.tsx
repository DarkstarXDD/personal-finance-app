"use client"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import Heading from "@/components/ui/Heading"
import Link from "@/components/ui/Link"
import TextField from "@/components/ui/TextField"

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-[35rem]">
      <div className="grid justify-items-center gap-8">
        <form className="grid w-full gap-8">
          <Heading as="h1">Login</Heading>
          <div className="grid gap-4">
            <TextField label="Email" name="email" />
            <TextField label="Password" type="password" name="password" />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="flex items-center gap-2">
          <span className="text-grey-500 text-sm leading-normal font-normal">
            Need to create an account?
          </span>
          <Link href="/signup" className="font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </Card>
  )
}

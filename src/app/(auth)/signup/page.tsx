import SignupForm from "@/components/auth/SignupForm"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign Up - Personal Finance",
}

export default function SignupPage() {
  return (
    <main>
      <SignupForm />
    </main>
  )
}

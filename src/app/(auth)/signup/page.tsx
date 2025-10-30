import { type Metadata } from "next"

import SignupForm from "@/features/auth/components/SignupForm"

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

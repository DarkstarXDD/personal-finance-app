import LoginForm from "@/components/auth/LoginForm"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - Personal Finance",
}

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  )
}

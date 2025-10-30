import { type Metadata } from "next"

import LoginForm from "@/features/auth/components/LoginForm"

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

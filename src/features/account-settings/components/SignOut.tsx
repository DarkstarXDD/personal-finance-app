"use client"

import { useFormStatus } from "react-dom"
import { FiLogOut } from "react-icons/fi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { signOut } from "@/features/account-settings/actions"

export default function SignOut() {
  return (
    <Card size="md">
      <form className="grid gap-6" action={signOut}>
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <FiLogOut className="text-fg-quaternary size-5" />
            <h3 className="text-primary font-semibold">Sign Out</h3>
          </div>
          <p className="text-sm">Sign out of your account on this device.</p>
        </div>

        <Submit />
      </form>
    </Card>
  )
}

// This setup currently has this bug: https://github.com/facebook/react/issues/30368
// Most probably because RAC button updates the state based on the pending from this hook
// The action works and the logout works, but the pending state will not be shown
function Submit() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="secondary" size="xl" isPending={pending}>
      Sign Out
    </Button>
  )
}

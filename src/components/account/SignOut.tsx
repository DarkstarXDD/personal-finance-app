"use client"

import { useFormStatus } from "react-dom"
import { PiSignOutBold } from "react-icons/pi"

import { signOut } from "@/actions/account"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function SignOut() {
  return (
    <Card>
      <form className="grid gap-6" action={signOut}>
        <div className="grid gap-2">
          <h3 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiSignOutBold className="text-grey-500 size-5" />
            Sign Out
          </h3>
          <p className="text-grey-500 text-sm">
            Sign out of your account on this device.
          </p>
        </div>
        <Submit />
      </form>
    </Card>
  )
}

function Submit() {
  // This setup currently has this bug: https://github.com/facebook/react/issues/30368
  // Most probably because RAC button updates the state based on the pending from this hook
  // The action works and the logout works, but the pending state will not be shown
  const { pending } = useFormStatus()
  console.log(pending)

  return (
    <Button type="submit" variant="secondary" isPending={pending}>
      Sign Out
    </Button>
  )
}

import { PiSignOutBold } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function SignOut() {
  return (
    <Card>
      <form className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiSignOutBold className="text-grey-500 size-5" />
            Sign Out
          </h2>
          <p className="text-grey-500 text-sm">
            Sign out of your account on this device.
          </p>
        </div>
        <div className="grid gap-4">
          <Button variant="secondary">Sign Out</Button>
        </div>
      </form>
    </Card>
  )
}

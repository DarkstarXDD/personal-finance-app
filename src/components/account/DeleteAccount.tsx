import { PiTrashFill } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function DeleteAccount() {
  return (
    <Card className="border-red border">
      <form className="grid gap-6">
        <div className="grid gap-2">
          <h3 className="text-red flex items-center gap-2 text-base leading-none font-semibold">
            <PiTrashFill className="size-5" />
            Delete Account
          </h3>
          <p className="text-grey-500 text-sm">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <div className="grid gap-4">
          <Button variant="destructive">Delete Account</Button>
        </div>
      </form>
    </Card>
  )
}

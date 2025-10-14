import { PiLockFill } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"

export default function Password() {
  return (
    <Card className="@5xl:col-span-2">
      <form className="grid gap-6">
        <div className="grid gap-2">
          <h3 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiLockFill className="text-grey-500 size-5" />
            Password
          </h3>
          <p className="text-grey-500 text-sm">
            Change your password to keep your account secure.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="flex flex-col gap-4 @5xl:flex-row">
            <TextField label="Current Password" />
            <TextField label="New Password" />
            <TextField label="Confirm Password" />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="justify-self-start"
          >
            Update Password
          </Button>
        </div>
      </form>
    </Card>
  )
}

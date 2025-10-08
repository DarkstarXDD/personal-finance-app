import { PiUserFill } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"

export default function Username() {
  return (
    <Card>
      <form className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiUserFill className="text-grey-500 size-5" />
            Username
          </h2>
          <p className="text-grey-500 text-sm">Update your username.</p>
        </div>
        <div className="grid gap-4">
          <TextField label="Username" />
          <Button variant="primary" className="justify-self-start">
            Update Username
          </Button>
        </div>
      </form>
    </Card>
  )
}

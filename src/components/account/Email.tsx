import { PiEnvelopeFill } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import TextField from "@/components/ui/TextField"

export default function Email() {
  return (
    <Card>
      <form className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-grey-900 flex items-center gap-2 text-base leading-none font-semibold">
            <PiEnvelopeFill className="text-grey-500 size-5" />
            Email
          </h2>
          <p className="text-grey-500 text-sm">Update your email address.</p>
        </div>
        <div className="grid gap-4">
          <TextField label="Email Address" />
          <Button variant="primary" className="justify-self-start">
            Update Email
          </Button>
        </div>
      </form>
    </Card>
  )
}

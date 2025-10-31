import { FiTrash2 } from "react-icons/fi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"

export default function DeleteAccount() {
  return (
    <Card size="md" className="border-error">
      <form className="grid gap-6">
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <FiTrash2 className="text-fg-error-secondary size-5" />
            <h3 className="text-primary font-semibold">Delete Account</h3>
          </div>
          <p className="text-sm">
            Permanently delete your account and all associated data.
          </p>
        </div>

        <div className="grid gap-4">
          <Button type="submit" variant="destructive" size="xl">
            Delete Account
          </Button>
        </div>
      </form>
    </Card>
  )
}

import { FiTrash2 } from "react-icons/fi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { DeleteDialogTrigger, DeleteDialog } from "@/components/ui/DeleteDialog"
import { deleteAccount } from "@/features/account-settings/actions"

export default function DeleteAccount() {
  return (
    <Card size="md" className="border-error">
      <div className="grid gap-6">
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
          <DeleteDialogTrigger>
            <Button type="submit" variant="destructive" size="xl">
              Delete Account...
            </Button>

            <DeleteDialog
              title="Delete account"
              description="This will permanently remove your account and all associated data including your email, transactions, pots, budgets and recurring bills."
              action={deleteAccount}
            >
              <p className="text-tertiary text-sm font-semibold">
                This action cannot be undone!
              </p>
            </DeleteDialog>
          </DeleteDialogTrigger>
        </div>
      </div>
    </Card>
  )
}

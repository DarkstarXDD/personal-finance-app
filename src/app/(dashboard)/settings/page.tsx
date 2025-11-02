import PageHeader from "@/components/common/PageHeader"
import DeleteAccount from "@/features/account-settings/components/DeleteAccount"
import Email from "@/features/account-settings/components/Email"
import Password from "@/features/account-settings/components/Password"
import SignOut from "@/features/account-settings/components/SignOut"
import Username from "@/features/account-settings/components/Username"
import { getUser } from "@/features/account-settings/data-access"

export default async function SettingsPage() {
  const user = await getUser()

  return (
    <main className="@container grid gap-8">
      <PageHeader
        title="Account Settings"
        description="Manage your account settings and preferences."
      />

      <div className="grid gap-6 @5xl:grid-cols-2">
        <h2 className="sr-only">User details</h2>
        <Username name={user.name} />
        <Email email={user.email} />
        <Password className="@5xl:col-span-2" />
      </div>

      <div className="border-secondary w-full border-b" />

      <div className="grid gap-6">
        <div className="grid gap-1">
          <h2 className="text-primary text-xl font-semibold">Danger Zone</h2>
          <p>Irreversible actions that affect your account.</p>
        </div>

        <div className="grid gap-6 @5xl:grid-cols-2">
          <SignOut />
          <DeleteAccount />
        </div>
      </div>
    </main>
  )
}

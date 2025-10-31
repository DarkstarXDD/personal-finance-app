import Heading from "@/components/ui/Heading"
import DeleteAccount from "@/features/account-settings/components/DeleteAccount"
import Email from "@/features/account-settings/components/Email"
import Password from "@/features/account-settings/components/Password"
import SignOut from "@/features/account-settings/components/SignOut"
import Username from "@/features/account-settings/components/Username"
import { getUser } from "@/features/account-settings/data-access"

export default async function AccountPage() {
  const user = await getUser()

  return (
    <main className="@container grid gap-8">
      <div className="grid gap-8">
        <div className="grid gap-2">
          <Heading as="h1" variant="primary">
            Account Settings
          </Heading>
          <p className="text-grey-500 text-base">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="grid gap-6 @5xl:grid-cols-2">
          <h2 className="sr-only">User details</h2>
          <Username name={user.name} />
          <Email email={user.email} />
          <Password />
        </div>

        <div className="bg-beige-300 h-0.25 w-full" />

        <div className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="text-grey-900 text-2xl leading-none font-bold">
              Danger Zone
            </h2>
            <p className="text-grey-500 text-base">
              Irreversible actions that affect your account.
            </p>
          </div>

          <div className="grid gap-6 @5xl:grid-cols-2">
            <SignOut />
            <DeleteAccount />
          </div>
        </div>
      </div>
    </main>
  )
}

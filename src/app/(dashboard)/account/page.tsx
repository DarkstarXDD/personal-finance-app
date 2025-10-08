import DeleteAccount from "@/components/account/DeleteAccount"
import Email from "@/components/account/Email"
import Password from "@/components/account/Password"
import SignOut from "@/components/account/SignOut"
import Username from "@/components/account/Username"
import Heading from "@/components/ui/Heading"

export default function AccountPage() {
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
          <Username />
          <Email />
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

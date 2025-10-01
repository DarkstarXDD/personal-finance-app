import Spinner from "@/components/loading-states/Spinner"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/LoadingStates/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: { theme: "light" },
  render: () => (
    <div className="bg-grey-900 flex size-14 flex-col items-center justify-center rounded-lg">
      <Spinner />
    </div>
  ),
}
export const Dark: Story = { args: { theme: "dark" } }

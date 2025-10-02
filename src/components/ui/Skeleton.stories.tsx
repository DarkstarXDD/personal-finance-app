import Skeleton from "@/components/ui/Skeleton"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Light: Story = { args: { className: "w-24 h-4" } }
export const Dark: Story = { args: { theme: "dark", className: "w-24 h-4" } }

import Checkbox from "@/components/ui/Checkbox"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,

  args: { children: "Checkbox Label" },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

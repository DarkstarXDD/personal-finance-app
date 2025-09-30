import Label from "@/components/ui/Label"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Label",
  component: Label,
  argTypes: {
    children: {
      table: { type: { summary: `ReactNode` } },
    },
  },
  args: {
    children: "Field Label",
  },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

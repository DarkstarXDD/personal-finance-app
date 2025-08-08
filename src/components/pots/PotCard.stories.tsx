import PotCard from "@/components/pots/PotCard"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/Pots/PotCard",
  component: PotCard,
  parameters: { layout: "padded" },
  globals: { backgrounds: { value: "neutral" } },
  argTypes: {
    name: {
      description: "Name of the pot, which is displayed at the top left.",
    },
    target: { description: "Target (goal) amount for the pot." },
    theme: { description: "Theme color of the pot." },
  },
} satisfies Meta<typeof PotCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: "New Computer",
    target: "2000",
    theme: "#277c78",
  },
}

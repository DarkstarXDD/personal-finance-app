import Spinner from "@/components/ui/Spinner"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Spinner",
  component: Spinner,

  parameters: {
    docs: {
      description: {
        component:
          "Small, motion-safe animated spinner used to indicate pending actions, typically on buttons.",
      },
    },
  },

  argTypes: {
    variant: {
      control: "select",
      description: "Color treatment used for the spinner.",
      options: ["primary", "secondary", "destructive"],
      table: {
        type: { summary: '"primary" | "secondary" | "destructive"' },
        defaultValue: { summary: '"primary"' },
      },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: "primary" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Destructive: Story = { args: { variant: "destructive" } }

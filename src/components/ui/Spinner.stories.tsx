import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import Spinner from "@/components/ui/Spinner"

const meta = {
  title: "Components/UI/Spinner",
  component: Spinner,

  parameters: {
    docs: {
      description: {
        component:
          "A simple SVG element with a motion-safe infinite spin animation, used to indicate pending actions, typically on buttons.",
      },
    },
  },

  argTypes: {
    variant: {
      description:
        "Changes the color of the spinner, so it is properly visible on different button variants.",
      control: "select",
      options: ["primary", "secondary", "destructive"],
      table: {
        type: { summary: '"primary" | "secondary" | "destructive"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    className: {
      description: "Optional class names to overide any styles.",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof Spinner>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: "primary" } }
export const Secondary: Story = { args: { variant: "secondary" } }
export const Destructive: Story = { args: { variant: "destructive" } }

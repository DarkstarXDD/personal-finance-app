import { fn } from "storybook/test"

import Button from "@/components/ui/Button"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Buttons/Button",
  component: Button,
  args: {
    children: "Placeholder",
    variant: "primary",
    isDisabled: false,
    isPending: false,
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      description:
        "Overall appearance of the button. Defines the background color and the corresponding foreground color.",
      options: ["primary", "secondary", "destructive", "close"],
      table: {
        type: {
          summary: '"primary" | "secondary" | "destructive" | "close"',
        },
      },
    },
    isDisabled: {
      control: "boolean",
    },
    className: { table: { disable: true } }, // hides from controls + docs table
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: "primary",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
}

export const Loading: Story = {
  args: {
    variant: "primary",
    isPending: true,
  },
}

export const Disabled: Story = {
  args: {
    variant: "primary",
    isDisabled: true,
  },
}

export const All: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="primary" isPending>
        Disabled
      </Button>
      <Button {...args} variant="primary" isDisabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

import { fn } from "storybook/test"

import Button from "@/components/ui/Button"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Button",
  component: Button,
  args: {
    children: "Placeholder",
    variant: "primary",
    isDisabled: false,
    onPress: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      description:
        "Overall appearance of the button. Defines the background color and the corresponding foreground color.",
      options: ["primary", "secondary", "tertiary", "destructive", "close"],
      table: {
        defaultValue: { summary: "primary" },
        type: {
          summary:
            '"primary" | "secondary" | "tertiary" | "destructive" | "close"',
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

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
}

export const Disabled: Story = {
  args: {
    variant: "primary",
    isDisabled: true,
  },
}

export const Close: Story = {
  args: {
    variant: "close",
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
      <Button {...args} variant="tertiary">
        Tertiary
      </Button>
      <Button {...args} variant="destructive">
        Destructive
      </Button>
      <Button {...args} variant="primary" isDisabled>
        Disabled
      </Button>
      <Button {...args} variant="close" />
    </div>
  ),
  parameters: { controls: { disable: true } },
}

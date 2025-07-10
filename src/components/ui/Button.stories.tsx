import { fn } from "storybook/test"

import Button from "@/components/ui/Button"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Button",
  component: Button,
  args: {
    children: "Placeholder",
    onPress: fn(),
    isDisabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "destructive"],
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

export const AllVariants: Story = {
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
    </div>
  ),
  parameters: { controls: { disable: true } },
}

import { fn } from "storybook/test"

import Button from "@/components/ui/Button"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Buttons/Button",
  component: Button,

  parameters: {
    docs: {
      description: {
        component: "Compact, accessible button used across the app.",
      },
    },
  },

  args: {
    children: "Placeholder",
    variant: "primary",
    size: "xl",
    isDisabled: false,
    isPending: false,
    onPress: fn(),
  },

  argTypes: {
    children: {
      control: "text",
      description: "Button label or content.",
      table: { type: { summary: "ReactNode" } },
    },
    variant: {
      control: "select",
      description: "Visual variant used for intent and emphasis.",
      options: ["primary", "secondary", "destructive", "close"],
      table: {
        type: { summary: '"primary" | "secondary" | "destructive"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    size: {
      control: "select",
      description: "Size token affecting padding and minimum height.",
      options: ["md", "lg", "xl"],
      table: {
        type: { summary: '"md" | "lg" | "xl"' },
        defaultValue: { summary: '"xl"' },
      },
    },
    isPending: {
      control: "boolean",
      description: "Show loading state and spinner.",
      table: { type: { summary: "boolean" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable interactions and apply disabled styles.",
      table: { type: { summary: "boolean" } },
    },
    onPress: {
      action: "onPress",
      description: "Callback invoked on user activation.",
      table: { type: { summary: "() => void" } },
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: "primary" },
}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const Destructive: Story = {
  args: { variant: "destructive" },
}

export const Loading: Story = {
  args: { isPending: true },
}

export const Disabled: Story = {
  args: { isDisabled: true },
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
        Loading
      </Button>
      <Button {...args} variant="primary" isDisabled>
        Disabled
      </Button>
    </div>
  ),
  parameters: { controls: { disable: true } },
}

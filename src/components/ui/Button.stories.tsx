import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"

import Button from "@/components/ui/Button"

const meta = {
  title: "Components/UI/Buttons/Button",
  component: Button,

  parameters: {
    docs: {
      description: {
        component:
          "Button component used across the app. Mainly used as form submit/cancel button, Dialog trigger and Select trigger.",
      },
    },
  },

  argTypes: {
    children: {
      description: "Button label or content.",
    },
    variant: {
      description: "Visual variant. Mostly changes the color.",
      control: "select",
      options: ["primary", "secondary", "destructive"],
      table: {
        type: { summary: '"primary" | "secondary" | "destructive"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    size: {
      description: "Mostly changes padding and minimum height.",
      control: "select",
      options: ["md", "lg", "xl"],
      table: {
        type: { summary: '"md" | "lg" | "xl"' },
        defaultValue: { summary: '"xl"' },
      },
    },
    isPending: {
      description: "Show loading spinner and apply loading styles.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    isDisabled: {
      description: "Disable interactions and apply disabled styles.",
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    onPress: {
      action: "onPress",
      description:
        "Callback to invoke when the button is pressed. Same as `onClick`.",
      table: { type: { summary: "(e: PressEvent) => void" } },
    },
    className: {
      description: "Optional class names to overide any styles.",
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

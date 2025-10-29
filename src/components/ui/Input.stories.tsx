import { PiUserFill } from "react-icons/pi"

import Input from "@/components/ui/Input"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Input",
  component: Input,

  parameters: {
    docs: {
      description: {
        component:
          "Low-level input element used by form field components such as TextField and SearchField. Supports an optional leading icon and a password visibility toggle when type is `password`.",
      },
    },
  },

  args: {
    placeholder: "Placeholder",
    type: "text",
  },

  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text for the input.",
      table: { type: { summary: "string" } },
    },
    type: {
      control: "select",
      description: "HTML input type.",
      options: ["text", "password", "email", "tel", "number"],
      table: {
        type: { summary: '"text" | "password" | "email" | "tel" | "number"' },
        defaultValue: { summary: '"text"' },
      },
    },
    icon: {
      control: false,
      description: "Leading icon component (IconType).",
      table: { type: { summary: "IconType" } },
    },
    className: {
      control: "text",
      description: "Additional CSS class names forwarded to the input.",
      table: { type: { summary: "string" } },
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLeadingIcon: Story = {
  args: { icon: PiUserFill },
}

export const WithPasswordVisibilityToggle: Story = {
  args: { type: "password" },
}

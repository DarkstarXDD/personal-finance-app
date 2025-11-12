import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { PiUserFill } from "react-icons/pi"

import Input from "@/components/ui/Input"

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

  argTypes: {
    placeholder: {
      description: "Placeholder text for the input.",
    },
    type: {
      description: "HTML input type.",
      control: "select",
      options: ["text", "password", "email", "tel", "number"],
      table: {
        type: { summary: '"text" | "password" | "email" | "tel" | "number"' },
        defaultValue: { summary: '"text"' },
      },
    },
    icon: {
      description:
        "Leading icon component (IconType). Passing an icon will automatically render the input with the leading icon. No toggle prop is used.",
    },
    className: {
      description:
        "Optional class names to overide any styles. Classes are passed directly to the input element.",
    },
  },

  args: {
    placeholder: "Placeholder",
    type: "text",
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

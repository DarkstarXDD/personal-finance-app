import { PiUserFill } from "react-icons/pi"

import TextField from "@/components/ui/TextField"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/TextField",
  component: TextField,

  parameters: {
    docs: {
      description: {
        component:
          "Combines FieldLabel, Input, FieldError and FieldDescription together.",
      },
    },
  },

  args: {
    label: "Text Field",
    placeholder: "Placeholder",
    isInvalid: false,
    isDisabled: false,
  },

  argTypes: {
    label: {
      control: "text",
      description: "Field label text.",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text shown inside the input.",
      table: { type: { summary: "string" } },
    },
    description: {
      control: "text",
      description: "Optional helper text shown under the field.",
      table: { type: { summary: "string | ReactNode" } },
    },
    errorMessage: {
      control: "text",
      description: "Error text shown when field is invalid.",
      table: { type: { summary: "string | ReactNode" } },
    },
    isInvalid: {
      control: "boolean",
      description: "Marks the field as invalid, applying invalid styles.",
      table: { type: { summary: "boolean" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable interactions and applies disabled styles.",
      table: { type: { summary: "boolean" } },
    },
    icon: {
      control: false,
      description: "Optional leading icon (IconType).",
      table: { type: { summary: "IconType" } },
    },
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: { description: "Helper text." },
}

export const WithErrorMessage: Story = {
  args: { errorMessage: "Field error message.", isInvalid: true },
}

export const WithIcon: Story = {
  args: { icon: PiUserFill },
}

export const Disabled: Story = {
  args: { icon: PiUserFill, isDisabled: true },
}

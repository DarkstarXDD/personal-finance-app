import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { PiUserFill } from "react-icons/pi"

import TextField from "@/components/ui/TextField"

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

  argTypes: {
    label: {
      description:
        "Label for the field. If a visible label is not provided, an aria-label should be provided.",
    },
    placeholder: {
      description: "Placeholder text shown inside the input.",
    },
    description: {
      description:
        "Optional help text for the field. If an error message is present in the UI, this will be hidden.",
    },
    errorMessage: {
      description:
        "Error message to be rendered, if the field is marked as invalid.",
    },
    isInvalid: {
      description: "Marks the field as invalid and applies invalid styles.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isDisabled: {
      description: "Disable interactions and applies disabled styles.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    icon: {
      description:
        "Optional leading icon. Passing an icon will automatically render the input with the leading icon. No toggle prop is used.",
      table: { type: { summary: "IconType" } },
    },
    className: {
      description:
        "Optional class names to overide any styles. Classes are passed to the wrapper element.",
      table: { type: { summary: "string" } },
    },
  },

  args: {
    label: "Text Field",
    placeholder: "Placeholder",
    isDisabled: false,
    isInvalid: false,
    errorMessage: "Field error message.",
  },
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { icon: PiUserFill },
}

export const WithDescription: Story = {
  args: { description: "Helper text." },
}

export const WithErrorMessage: Story = {
  args: { errorMessage: "Field error message.", isInvalid: true },
}

export const Disabled: Story = {
  args: { icon: PiUserFill, isDisabled: true },
}

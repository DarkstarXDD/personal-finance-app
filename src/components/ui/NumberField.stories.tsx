import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { PiCurrencyDollarSimple } from "react-icons/pi"

import NumberField from "@/components/ui/NumberField"

const meta = {
  title: "Components/UI/NumberField",
  component: NumberField,

  parameters: {
    docs: {
      description: {
        component:
          "Number only input with increment/decrement controls and optional leading icon. Combines FieldLabel, Input, FieldError and FieldDescription together.",
      },
    },
  },

  argTypes: {
    label: {
      control: "text",
      description:
        "Label for the field. If a visible label is not provided, an aria-label should be provided.",
    },
    description: {
      control: "text",
      description:
        "Optional help text for the field. If an error message is present in the UI, this will be hidden.",
    },
    errorMessage: {
      control: "text",
      description:
        "Error message to be rendered, if the field is marked as invalid.",
    },
    isInvalid: {
      control: "boolean",
      description: "Marks the field as invalid and applies invalid styles.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable interactions and applies disabled styles.",
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
    },
  },

  args: {
    label: "Number Field",
    icon: PiCurrencyDollarSimple,
    isDisabled: false,
  },
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { icon: PiCurrencyDollarSimple },
}

export const WithDescription: Story = {
  args: { description: "Helper text." },
}

export const WithErrorMessage: Story = {
  args: { errorMessage: "Field error message.", isInvalid: true },
}

export const Disabled: Story = {
  args: { isDisabled: true },
}

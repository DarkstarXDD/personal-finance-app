import { PiCurrencyDollarSimple } from "react-icons/pi"

import NumberField from "@/components/ui/NumberField"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/NumberField",
  component: NumberField,

  parameters: {
    docs: {
      description: {
        component:
          "Number only input with increment/decrement controls and optional leading icon.",
      },
    },
  },

  args: {
    label: "Number Field",
    icon: PiCurrencyDollarSimple,
    isDisabled: false,
  },

  argTypes: {
    label: {
      control: "text",
      description:
        "Label for the field. If a visible label is not provided, an aria-label should be provided. ",
      table: { type: { summary: "string" } },
    },
    description: {
      control: "text",
      description:
        "Optional help text for the field. If an error message is present in the UI, this will be hidden.",
      table: { type: { summary: "string | ReactNode" } },
    },
    errorMessage: {
      control: "text",
      description:
        "Error message to be rendered, if the field is marked as invalid.",
      table: { type: { summary: "string | ReactNode" } },
    },
    isInvalid: {
      control: "boolean",
      description: "Marks the field as invalid.",
      table: { type: { summary: "boolean" } },
    },
    icon: {
      control: false,
      description: "Optional leading icon (IconType).",
      table: { type: { summary: "IconType" } },
    },
    className: { table: { disable: true } },
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

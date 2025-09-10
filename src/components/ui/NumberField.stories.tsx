import NumberField from "@/components/ui/NumberField"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/NumberField",
  component: NumberField,

  argTypes: {
    label: {
      description:
        "Label for the field. If a visible label is not provided, an aria-label should be provided. ",
    },
    description: {
      description:
        "Optional help text for the field. If an error message is present in the UI, this will be hidden.",
    },
    errorMessage: {
      description:
        "Error message to be rendered, if the field is marked as invalid.",
    },
  },

  args: { label: "Number Field" },
} satisfies Meta<typeof NumberField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithDescription: Story = {
  args: { description: "Helper text" },
}

export const WithErrorMessage: Story = {
  args: { errorMessage: "Field error message", isInvalid: true },
}

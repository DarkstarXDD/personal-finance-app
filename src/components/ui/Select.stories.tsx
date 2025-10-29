import { Select, SelectItem } from "@/components/ui/Select"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Combines Button, FieldLabel, FieldError and FieldDescription together to create a Select field.",
      },
    },
  },

  args: {
    label: "Label",
    placeholder: "Select an Item",
    errorMessage: "Field error message",
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
      description: "Placeholder shown when no value is selected.",
      table: { type: { summary: "string" } },
    },
    description: {
      control: "text",
      description:
        "Optional Helper text shown under the field when not invalid.",
      table: { type: { summary: "ReactNode" } },
    },
    errorMessage: {
      control: "text",
      description: "Error message displayed when the field is invalid.",
      table: { type: { summary: "ReactNode" } },
    },
    isInvalid: {
      control: "boolean",
      description: "Marks the field as invalid.",
      table: { type: { summary: "boolean" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable interactions and apply disabled styles.",
      table: { type: { summary: "boolean" } },
    },
    items: {
      control: false,
      description: "Optional items iterable passed to the listbox.",
      table: { type: { summary: "Iterable<T>" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

export const WithDescription: Story = {
  args: {
    description: "Helper text",
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

export const WithErrorMessage: Story = {
  args: {
    description: "Helper text",
    errorMessage: "Field error message",
    isInvalid: true,
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Select {...args}>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import { Select, SelectItem } from "@/components/ui/Select"

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

  argTypes: {
    label: {
      description:
        "Label for the field. If a visible label is not provided, an aria-label should be provided.",
    },
    placeholder: {
      description: "Placeholder text shown when no value is selected.",
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
    items: {
      description: "Optional items iterable passed to the listbox.",
      control: false,
      table: { type: { summary: "Iterable<T>" } },
    },
    children: {
      description:
        "Either `SelectItem` components or a function that will be called for each item in the `items` array and returns a `SelectItem`.",
      table: { type: { summary: "ReactNode | ((item: T) => ReactNode)" } },
    },
    className: {
      description:
        "Optional class names to overide any styles. Classes are passed to the wrapper element.",
      table: { type: { summary: "string" } },
    },
  },

  args: {
    label: "Label",
    placeholder: "Select an Item...",
    isDisabled: false,
    isInvalid: false,
    errorMessage: "Field error message.",
  },

  decorators: [
    (Story) => (
      <div className="m-auto max-w-xs">
        <Story />
      </div>
    ),
  ],
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
    description: "Helper text.",
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
    description: "Helper text.",
    errorMessage: "Field error message.",
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

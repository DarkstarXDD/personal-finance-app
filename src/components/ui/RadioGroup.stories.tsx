import { PiArrowsOutSimpleFill } from "react-icons/pi"

import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/RadioGroup",
  component: RadioGroup,

  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A grouped set of selectable radio options. Shows label, optional descriptions and an error message.",
      },
    },
  },

  args: {
    label: "Label",
    isDisabled: false,
  },

  argTypes: {
    label: {
      control: "text",
      description:
        "Label for the radio group. If a visible label is not provided, an aria-label should be provided.",
      table: { type: { summary: "string" } },
    },
    errorMessage: {
      control: "text",
      description: "Error message to display when the group is invalid.",
      table: { type: { summary: "string | ReactNode" } },
    },
    isInvalid: {
      control: "boolean",
      description:
        "Mark the radio group as invalid and show the error message.",
      table: { type: { summary: "boolean" } },
    },
    isDisabled: {
      control: "boolean",
      description: "Disable all radio items.",
      table: { type: { summary: "boolean" } },
    },
  },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 01"
        description="Small description for item."
        value="option-1"
      />
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 02"
        description="Small description for item."
        value="option-2"
      />
    </RadioGroup>
  ),
}

export const WithErrorMessage: Story = {
  args: { errorMessage: "Radio group error message.", isInvalid: true },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 01"
        description="Small description for item."
        value="option-1"
      />
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 02"
        description="Small description for item."
        value="option-2"
      />
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 03"
        description="Small description for item."
        value="option-3"
      />
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  args: { isDisabled: true },
  render: (args) => (
    <RadioGroup {...args}>
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 01"
        description="Small description for item."
        value="option-1"
      />
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 02"
        description="Small description for item."
        value="option-2"
      />
      <RadioGroupItem
        icon={PiArrowsOutSimpleFill}
        title="Option 03"
        description="Small description for item."
        value="option-3"
      />
    </RadioGroup>
  ),
}

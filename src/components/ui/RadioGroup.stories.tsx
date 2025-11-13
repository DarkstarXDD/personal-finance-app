import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { PiArrowsOutSimpleFill } from "react-icons/pi"

import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

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

  argTypes: {
    label: {
      description:
        "Label for the radio group. If a visible label is not provided, an aria-label should be provided.",
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
      description:
        "Disable interactions of all radio buttons and applies disabled styles.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },

  args: {
    label: "Label",
    isDisabled: false,
    isInvalid: false,
    errorMessage: "Field error message.",
  },

  decorators: [
    (Story) => (
      <div className="m-auto max-w-lg">
        <Story />
      </div>
    ),
  ],
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

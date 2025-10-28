import { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TextField } from "react-aria-components"

import FieldError from "@/components/ui/FieldError"

const meta = {
  title: "Components/UI/FieldError",
  component: FieldError,

  parameters: {
    docs: {
      description: {
        component:
          "Inline error text displayed for an invalid form field. Typically used with TextField, SearchField, NumberField, Select, and RadioGroup.",
      },
    },
  },

  args: {
    children: "Field error message.",
  },

  argTypes: {
    children: {
      control: "text",
      description: "Text content to display as the error message.",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      control: "text",
      table: { type: { summary: "string" } },
    },
  },

  // Need to wrap the FieldError in some Field component from RAC. Otherwise the FieldError won't render anything
  render: (args) => (
    <TextField isInvalid>
      <FieldError {...args} />
    </TextField>
  ),
} satisfies Meta<typeof FieldError>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

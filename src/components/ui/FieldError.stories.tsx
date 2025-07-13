import { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TextField } from "react-aria-components"

import FieldError from "@/components/ui/FieldError"

const meta = {
  title: "Components/UI/FieldError",
  component: FieldError,
  // Need to wrap the FieldError in some Field component. Otherwise the FieldError won't render anything
  render: (args) => (
    <TextField isInvalid>
      <FieldError {...args} />
    </TextField>
  ),
  argTypes: {
    className: { control: false },
  },
} satisfies Meta<typeof FieldError>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Field error message",
  },
}

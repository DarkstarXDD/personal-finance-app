import { Meta, StoryObj } from "@storybook/nextjs-vite"

import FieldDescription from "@/components/ui/FieldDescription"

const meta = {
  component: FieldDescription,
  argTypes: {
    className: { control: false },
  },
} satisfies Meta<typeof FieldDescription>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    description: "Help text",
  },
}

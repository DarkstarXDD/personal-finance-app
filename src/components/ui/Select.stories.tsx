import { Select, SelectItem } from "@/components/ui/Select"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: Select,
  decorators: [
    (Story) => (
      <div className="w-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectItem>Apple</SelectItem>
      <SelectItem>Banana</SelectItem>
      <SelectItem>Mango</SelectItem>
      <SelectItem>Orange</SelectItem>
    </Select>
  ),
}

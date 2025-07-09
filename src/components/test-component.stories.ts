import TestComponent from "@/components/test-component"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  component: TestComponent,
} satisfies Meta<typeof TestComponent>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: "Hello, World",
  },
}

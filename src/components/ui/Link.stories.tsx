import Link from "@/components/ui/Link"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Link",
  component: Link,
  args: {
    href: "/",
    children: "This is a Link",
    withIcon: false,
  },
} satisfies Meta<typeof Link>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { withIcon: true },
}

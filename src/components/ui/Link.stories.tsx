import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import Link from "@/components/ui/Link"

const meta = {
  title: "Components/UI/Link",
  component: Link,

  parameters: {
    docs: { description: { component: "A link component." } },
  },

  argTypes: {
    href: { description: "URL to the destination." },
    children: {
      description: "Content to display as the link content.",
      table: { type: { summary: "ReactNode" } },
    },
    withIcon: {
      description: "Whether to render the arrow icon or not.",
      table: { defaultValue: { summary: "false" } },
    },
  },

  args: {
    href: "#",
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

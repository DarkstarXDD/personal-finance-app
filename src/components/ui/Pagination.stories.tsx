import Pagination from "@/components/ui/Pagination"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Pagination",
  component: Pagination,
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { nextjs: { navigation: { query: { page: 5 } } } },
  args: { totalPages: 10 },
}

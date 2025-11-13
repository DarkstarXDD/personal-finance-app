import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import Pagination from "@/components/ui/Pagination"

const meta = {
  title: "Components/UI/Pagination",
  component: Pagination,

  parameters: {
    docs: {
      description: {
        component:
          "Given the total number of pages, renders the appropriate number of page number blocks based on the current page from the URL. It includes two versions: one for mobile screens and one for larger screens. The component automatically displays the correct version using media queries.",
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: { nextjs: { navigation: { query: { page: 5 } } } },
  args: { totalPages: 10 },
}

import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import Skeleton from "@/components/ui/Skeleton"

const meta = {
  title: "Components/UI/Skeleton",
  component: Skeleton,

  parameters: {
    docs: {
      description: {
        component:
          "A simple span element with a motion-safe pulse animation. Ideal to use as fallback UI when data is being fetched.",
      },
    },
  },

  argTypes: {
    className: {
      description:
        "Optional class names to overide any styles. Usually used to specify a width and height to match the underlying DOM element that will be rendered once the data fetching is done.",
      table: { type: { summary: "string" } },
    },
    children: {
      description:
        "Mostly won't need to pass children. But if needed can pass and render some content inside.",
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = { args: { className: "w-24 h-8" } }

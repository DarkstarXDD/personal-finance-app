import { PiTipJarFill } from "react-icons/pi"

import EmptyState from "@/components/empty-states/EmptyState"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/EmptyStates/EmptyState",
  component: EmptyState,

  parameters: {
    docs: {
      description: {
        component:
          "A UI to display when the user has not created any data in the database. Usually every user will see this when they first signup.",
      },
    },
  },

  argTypes: {
    icon: { description: "Icon to render." },
    title: { description: "Title of the empty state." },
    description: { description: "Description of the empty state." },
  },

  args: {
    icon: PiTipJarFill,
    title: "Title of the empty state",
    description: "Description of the empty state.",
  },
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

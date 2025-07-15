import Heading from "@/components/ui/Heading"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Heading",
  component: Heading,
  args: {
    as: "h1",
    children: "This is a heading",
    variant: "primary",
  },
  argTypes: {
    className: { table: { disable: true } },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description:
        "Controls the semantic HTML tag rendered. This has no effect on visual appearance.",
      table: {
        defaultValue: { summary: "h1" },
        type: { summary: '"h1" | "h2" | "h3" | "h4" |"h5" | "h6"' },
      },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
      description:
        "Controls the visual appearance such as font size, weight, and color. Independent of the HTML tag.",
      table: {
        defaultValue: { summary: "primary" },
        type: { summary: '"primary" | "secondary" | "tertiary"' },
      },
    },
  },
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}

export const Secondary: Story = {
  args: { variant: "secondary" },
}

export const Tertiary: Story = {
  args: { variant: "tertiary" },
}

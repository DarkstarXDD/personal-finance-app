import Card from "@/components/ui/Card"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Card",
  component: Card,
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia elit in iaculis vulputate. Sed pretium imperdiet ligula, sit amet rutrum tortor volutpat nec. Donec lobortis pharetra lectus, sed porttitor mauris pellentesque ut. Quisque mi mi, ornare id maximus nec, dignissim id arcu. Integer mollis semper sem non eleifend. Donec sed felis quam. Curabitur hendrerit odio ut feugiat vulputate. Sed vitae tincidunt nisi. Morbi orci mauris, fermentum id fringilla sit amet, aliquam vitae magna. Sed tempus lobortis felis. Nunc et risus elementum, volutpat est pretium, consequat odio. Sed vitae velit justo.",
    theme: "light",
    padding: "lg",
  },
  argTypes: {
    className: { table: { disable: true } },
    theme: {
      control: "select",
      description:
        "Defines the background color and the corresponding foreground color.",
      options: ["light", "dark"],
      table: {
        defaultValue: { summary: "light" },
        type: { summary: '"light" | "dark"' },
      },
    },
    padding: {
      control: "select",
      description:
        "The padding around the content of the card.('sm' - p-5, md:p-6 | 'lg' - px-5 py-6, md:p-8)",
      options: ["sm", "lg"],
      table: {
        defaultValue: { summary: "lg" },
        type: { summary: '"sm" | "lg"' },
      },
    },
  },
  globals: {
    backgrounds: { value: "neutral" },
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const LightTheme: Story = {
  args: { theme: "light" },
}
export const DarkTheme: Story = {
  args: { theme: "dark" },
}
export const PaddingSmall: Story = {
  args: { padding: "sm" },
}
export const PaddingLarge: Story = {
  args: { padding: "lg" },
}

import Card from "@/components/ui/Card"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Card",
  component: Card,
  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia elit in iaculis vulputate. Sed pretium imperdiet ligula, sit amet rutrum tortor volutpat nec. Donec lobortis pharetra lectus, sed porttitor mauris pellentesque ut. Quisque mi mi, ornare id maximus nec, dignissim id arcu. Integer mollis semper sem non eleifend. Donec sed felis quam. Curabitur hendrerit odio ut feugiat vulputate. Sed vitae tincidunt nisi. Morbi orci mauris, fermentum id fringilla sit amet, aliquam vitae magna. Sed tempus lobortis felis. Nunc et risus elementum, volutpat est pretium, consequat odio. Sed vitae velit justo.",
    size: "lg",
  },
  argTypes: {
    className: { table: { disable: true } },
    size: {
      control: "select",
      description: "The padding around the content of the card.",
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "lg" },
        type: { summary: '"sm" | "md" | "lg"' },
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
export const LightTheme: Story = {}
export const DarkTheme: Story = {}
export const PaddingSmall: Story = {
  args: { size: "sm" },
}
export const PaddingMedium: Story = {
  args: { size: "md" },
}
export const PaddingLarge: Story = {
  args: { size: "lg" },
}

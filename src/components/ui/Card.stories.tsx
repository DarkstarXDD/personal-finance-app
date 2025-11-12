import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import Card from "@/components/ui/Card"

const meta = {
  title: "Components/UI/Card",
  component: Card,

  parameters: {
    docs: {
      description: {
        component:
          "Renders a card with padding, thin borders, slight shadow and rounded corners. Used to isolate UI sections throughout the app.",
      },
    },
  },

  argTypes: {
    children: {
      description: "Content to be rendered inside the card.",
    },
    size: {
      description:
        "Changes the padding between card edges and content of the card.",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        defaultValue: { summary: "lg" },
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    className: {
      description: "Optional class names to overide any styles.",
    },
  },

  args: {
    children:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia elit in iaculis vulputate. Sed pretium imperdiet ligula, sit amet rutrum tortor volutpat nec. Donec lobortis pharetra lectus, sed porttitor mauris pellentesque ut. Quisque mi mi, ornare id maximus nec, dignissim id arcu. Integer mollis semper sem non eleifend. Donec sed felis quam. Curabitur hendrerit odio ut feugiat vulputate. Sed vitae tincidunt nisi. Morbi orci mauris, fermentum id fringilla sit amet, aliquam vitae magna. Sed tempus lobortis felis. Nunc et risus elementum, volutpat est pretium, consequat odio. Sed vitae velit justo.",
    size: "lg",
  },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const PaddingSmall: Story = {
  args: { size: "sm" },
}

export const PaddingMedium: Story = {
  args: { size: "md" },
}

export const PaddingLarge: Story = {
  args: { size: "lg" },
}

export const EmptyCard: Story = {
  args: { children: undefined },
}

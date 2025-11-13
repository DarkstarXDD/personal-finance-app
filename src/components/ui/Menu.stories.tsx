import { type Meta, type StoryObj } from "@storybook/nextjs-vite"

import IconButton from "@/components/ui/IconButton"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/Menu"

const meta = {
  title: "Components/UI/Menu",
  component: Menu,

  parameters: {
    docs: {
      description: {
        component: "A Menu component that can render Menu Items.",
      },
    },
  },

  argTypes: {
    placement: {
      description: "Popover placement relative to the trigger.",
      control: "select",
      options: ["bottom right", "bottom left", "top right", "top left"],
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bottom right" },
      },
    },
    children: {
      description: "Children should be MenuItem components.",
      table: { type: { summary: "ReactNode" } },
    },
    className: {
      description:
        "Optional class names to overide any styles. Classes are passed to the Menu element.",
      control: "text",
      table: { type: { summary: "string" } },
    },
  },

  args: {
    placement: "bottom right",
  },
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <MenuTrigger defaultOpen>
      <IconButton variant="options" />
      <Menu {...args}>
        <MenuItem>Menu Item 01</MenuItem>
        <MenuItem>Menu Item 02</MenuItem>
        <MenuItem>Menu Item 03</MenuItem>
        <MenuItem>Menu Item 04</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

import IconButton from "@/components/ui/IconButton"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/Menu"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

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

  args: {
    placement: "bottom right",
  },

  argTypes: {
    placement: {
      control: "select",
      options: ["bottom right", "bottom left", "top right", "top left"],
      description: "Popover placement relative to the trigger.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "bottom right" },
      },
    },
    children: {
      control: { disable: true },
      table: { type: { summary: "ReactNode" } },
    },
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

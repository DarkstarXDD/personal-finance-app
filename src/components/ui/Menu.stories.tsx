import IconButton from "@/components/ui/IconButton"
import { MenuTrigger, Menu, MenuItem } from "@/components/ui/Menu"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/UI/Menu",
  component: Menu,
  argTypes: {
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MenuTrigger defaultOpen>
      <IconButton variant="options" />
      <Menu>
        <MenuItem>Menu Item 01</MenuItem>
        <MenuItem>Menu Item 02</MenuItem>
        <MenuItem>Menu Item 03</MenuItem>
        <MenuItem>Menu Item 04</MenuItem>
      </Menu>
    </MenuTrigger>
  ),
}

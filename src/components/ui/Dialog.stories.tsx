import { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"

const meta = {
  title: "Components/UI/Dialog",
  component: Dialog,
  args: {
    title: "Dialog Title",
    role: "dialog",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title (heading) of the dialog.",
      table: {
        defaultValue: { summary: "Dialog Title" },
        type: { summary: "string" },
      },
    },
    role: {
      control: "select",
      options: ["dialog", "alertdialog"],
      description:
        "Defines the role of the dialog, which affects accessibility.",
      table: {
        defaultValue: { summary: "dialog" },
        type: { summary: '"dialog" | "alertdialog"' },
      },
    },
  },
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <DialogTrigger>
      <Button variant="primary">Open Dialog</Button>
      <Dialog {...args}>
        <div className="grid gap-4">
          <p>
            This is a dialog content area. You can place any content here, such
            as forms, text, or other components.
          </p>
          <Button variant="primary">Action Button</Button>
        </div>
      </Dialog>
    </DialogTrigger>
  ),
}

export const Controlled: Story = {
  render: (args) => {
    function Example() {
      const [isDialogOpen, setIsDialogOpen] = useState(false)

      return (
        <>
          <Button onPress={() => setIsDialogOpen(true)}>Open Dialog</Button>
          <Dialog
            {...args}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          >
            <div className="grid gap-4">
              <p>
                This is a dialog content area. You can place any content here,
                such as forms, text, or other components.
              </p>
              <Button slot="close">Close Dialog</Button>
            </div>
          </Dialog>
        </>
      )
    }
    return <Example />
  },
  parameters: {
    docs: {
      description: {
        story:
          "There may be cases where you don't want to use a trigger element for the Dialog. Instead you may want to control the open state of the Dialog using React State in a controlled way. In that case you can omit the `<DialogTrigger>` component and use the `<Dialog>` directly.",
      },
    },
  },
}

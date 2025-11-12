import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"

const meta = {
  title: "Components/UI/Dialog",
  component: Dialog,

  parameters: {
    docs: {
      description: {
        component:
          "Modal dialog with a slight animated entry. Provides a title, optional description, and slot-based children. Use `DialogTrigger` for an uncontrolled component or make it a controlled component via `isOpen`/`onOpenChange`.",
      },
    },
  },

  argTypes: {
    title: {
      description: "The title (heading) of the dialog.",
    },
    description: {
      description: "Optional supporting text shown below the title.",
    },
    role: {
      description:
        "Defines the role of the dialog, which affects accessibility.",
      control: "select",
      options: ["dialog", "alertdialog"],
      table: {
        defaultValue: { summary: "dialog" },
        type: { summary: '"dialog" | "alertdialog"' },
      },
    },
    isOpen: {
      description:
        "Controlled open state for the dialog (use with `onOpenChange`). Not needed if the `Dialog` is rendered inside a `DialogTrigger`.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onOpenChange: {
      description: "Callback to invoke when the open state changes.",
      table: { type: { summary: "(isOpen: boolean) => void" } },
    },
    children: {
      description: "Content to be rendered inside the dialog.",
      table: {
        type: {
          summary: "ReactNode | ({close}: DialogRenderProps) => ReactNode",
        },
      },
    },
  },

  args: {
    title: "Dialog Title",
    description: "Dialog title support text.",
    role: "dialog",
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
          <p className="text-tertiary">
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
          <Button variant="primary" onPress={() => setIsDialogOpen(true)}>
            Open Dialog
          </Button>
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
              <Button variant="primary" slot="close">
                Close Dialog
              </Button>
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

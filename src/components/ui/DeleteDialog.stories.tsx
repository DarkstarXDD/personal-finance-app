import { type Meta, type StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { fn } from "storybook/test"

import Button from "@/components/ui/Button"
import { DeleteDialogTrigger, DeleteDialog } from "@/components/ui/DeleteDialog"

const meta = {
  title: "Components/UI/DeleteDialog",
  component: DeleteDialog,

  parameters: {
    docs: {
      description: {
        component:
          "Dialog for delete confirmations. Provides a trash can icon, a title, optional description, and slot-based children. Use `DialogTrigger` for an uncontrolled component or make it a controlled component via `isOpen`/`onOpenChange`.",
      },
    },
  },

  argTypes: {
    title: {
      description: "The title (heading) of the dialog.",
    },
    description: {
      description: "Optional supporting text shown beneath the title.",
    },
    action: {
      description:
        "Server action or handler invoked when the delete form is submitted. Receives (prev, formData) and should return an error string or null.",
      table: {
        type: {
          summary:
            "(prev: string | null | undefined, formData: FormData) => Promise<string | null | undefined>",
        },
      },
    },
    itemId: {
      description:
        "Optional id of the item being deleted (included in the form).",
      control: "text",
      table: { type: { summary: "string | number" } },
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
    title: "Delete blog post.",
    description:
      "Are you sure you want to delete this post? This action cannot be undone.",
    action: fn(),
  },
} satisfies Meta<typeof DeleteDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <DeleteDialogTrigger>
      <Button variant="primary">Open Dialog</Button>
      <DeleteDialog {...args} />
    </DeleteDialogTrigger>
  ),
}

export const Controlled: Story = {
  args: {},
  render: (args) => {
    function Example() {
      const [isDialogOpen, setIsDialogOpen] = useState(false)

      return (
        <>
          <Button variant="primary" onPress={() => setIsDialogOpen(true)}>
            Open Dialog
          </Button>
          <DeleteDialog
            {...args}
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
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

export const WithExtraContent: Story = {
  args: {},
  render: (args) => (
    <DeleteDialogTrigger>
      <Button variant="primary">Open Dialog</Button>
      <DeleteDialog {...args}>
        <div className="grid gap-4">
          <p className="text-tertiary">
            Optional extra content. You can place any content here, such as
            forms, text, or other components.
          </p>
        </div>
      </DeleteDialog>
    </DeleteDialogTrigger>
  ),
}

import { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"

import Button from "@/components/ui/Button"
import { DeleteDialogTrigger, DeleteDialog } from "@/components/ui/DeleteDialog"

const meta = {
  title: "Components/UI/DeleteDialog",
  component: DeleteDialog,

  parameters: {
    docs: {
      description: {
        component:
          "Dialog for delete confirmations. Provides a title, optional description, and slot-based children. Use `DialogTrigger` for an automatic trigger or control it via `isOpen`/`onOpenChange`.",
      },
    },
  },

  args: {
    title: "Delete blog post.",
    description:
      "Are you sure you want to delete this post? This action cannot be undone.",
    // stub server action for Storybook — returns null (no error)
    action: async (_prev: string | null | undefined, _formData: FormData) => {
      void _prev
      void _formData
      return null
    },
  },

  argTypes: {
    title: {
      control: "text",
      description: "The title (heading) of the dialog.",
      table: { type: { summary: "string" } },
    },
    description: {
      control: "text",
      description: "Optional supporting text shown beneath the title.",
      table: { type: { summary: "string | ReactNode" } },
    },

    action: {
      control: false,
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
      control: "text",
      description:
        "Optional id of the item being deleted (included in the form).",
      table: { type: { summary: "string | number" } },
    },

    isOpen: {
      control: "boolean",
      description:
        "Controlled open state for the dialog (use with onOpenChange).",
      table: { type: { summary: "boolean" } },
    },
    onOpenChange: {
      action: "onOpenChange",
      description: "Callback when open state changes.",
      table: { type: { summary: "(isOpen: boolean) => void" } },
    },
    children: {
      table: { type: { summary: "ReactNode | ({close}) => ReactNode" } },
    },
    className: { table: { disable: true } },
  },
} satisfies Meta<typeof DeleteDialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
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
          <p>
            Optional extra content. You can place any content here, such as
            forms, text, or other components.
          </p>
        </div>
      </DeleteDialog>
    </DeleteDialogTrigger>
  ),
}

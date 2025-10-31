import TransactionAmount from "@/features/transactions/components/TransactionAmount"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/Transactions/TransactionAmount",
  component: TransactionAmount,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Renders a formatted transaction amount. Optionally, adds '+' or '−, and a color, if the transaction type is given.",
      },
    },
  },

  args: {
    amount: "450",
  },

  argTypes: {
    amount: {
      control: "text",
      description: "Amount of the transaction.",
      table: { type: { summary: "string | number" } },
    },
    transactionType: {
      description: "Type of the transaction.",
      table: {
        type: { summary: '"INCOME" | "EXPENSE"' },
      },
      control: "select",
      options: ["INCOME", "EXPENSE"],
    },
  },
} satisfies Meta<typeof TransactionAmount>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Income: Story = {
  args: { transactionType: "INCOME" },
}

export const Expense: Story = {
  args: { transactionType: "EXPENSE" },
}

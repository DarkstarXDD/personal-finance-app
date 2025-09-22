import TransactionAmount from "@/components/transactions/TransactionAmount"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Components/Transactions/TransactionAmount",
  component: TransactionAmount,
  parameters: {
    layout: "padded",
  },

  argTypes: {
    transactionAmount: {
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

  args: {
    transactionAmount: "450",
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

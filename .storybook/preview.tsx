import type { Preview } from "@storybook/nextjs-vite"
import "../src/app/globals.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: "error" },
  },
  decorators: [
    (Story) => (
      <div className="font-public-sans tracking-normal">
        <Story />
      </div>
    ),
  ],
}

export default preview

import type { Preview } from "@storybook/nextjs-vite"
import "../src/app/globals.css"

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    a11y: { test: "error" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#201f23" },
        light: { name: "White", value: "#ffffff" },
        neutral: { name: "Neutral", value: "#f8f5f1" },
      },
    },
  },

  initialGlobals: {
    backgrounds: { value: "light" },
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

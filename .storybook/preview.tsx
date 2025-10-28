import "@/styles/globals.css"

import { MINIMAL_VIEWPORTS } from "storybook/viewport"

import type { Preview } from "@storybook/nextjs-vite"

const customViewports = {
  mediumMobile: {
    name: "Medium Mobile",
    styles: {
      width: "375px",
      height: "800px",
    },
  },
}

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    layout: "centered",
    a11y: { test: "error" },
    backgrounds: {
      options: {
        dark: { name: "Dark", value: "#201f23" },
        light: { name: "White", value: "#ffffff" },
        neutral: { name: "Neutral", value: "#f8f5f1" },
      },
    },
    viewport: { options: { ...MINIMAL_VIEWPORTS, ...customViewports } },
    nextjs: {
      appDirectory: true,
    },
  },

  initialGlobals: {
    backgrounds: { value: "light" },
  },

  decorators: [
    (Story) => (
      <div className="font-body">
        <Story />
      </div>
    ),
  ],
}

export default preview

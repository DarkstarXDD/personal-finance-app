// @ts-expect-error no types
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // typedRoutes: true,
  logging: {
    fetches: { fullUrl: true },
  },

  // cacheComponents: true,

  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = [...config.plugins, new PrismaPlugin()]
  //   }
  //   return config
  // },
}

export default nextConfig

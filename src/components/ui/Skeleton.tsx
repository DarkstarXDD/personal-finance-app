import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

type SkeletonProps = {
  className?: string
  children?: ReactNode
}

export default function Skeleton({ className, children }: SkeletonProps) {
  return (
    <span
      className={cn(
        "bg-skeleton block rounded-md motion-safe:animate-pulse",
        className
      )}
    >
      {children}
    </span>
  )
}

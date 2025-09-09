import { IconType } from "react-icons"

import Heading from "@/components/ui/Heading"

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: IconType
  title: string
  description: string
}) {
  return (
    <div className="grid justify-items-center gap-3 py-12 text-center">
      <div className="bg-beige-100 flex h-16 w-16 items-center justify-center rounded-full">
        <Icon className="text-grey-500 size-8" />
      </div>
      <Heading as="h3" variant="secondary">
        {title}
      </Heading>
      <p className="text-grey-500 text-sm leading-normal font-normal">
        {description}
      </p>
    </div>
  )
}

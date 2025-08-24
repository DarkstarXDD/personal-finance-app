"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  SearchField as RacSearchField,
  Input as RacInput,
  Button as RacButton,
  type SearchFieldProps as RacSearchFieldProps,
} from "react-aria-components"
import { PiXCircleFill, PiMagnifyingGlassBold } from "react-icons/pi"
import { useDebouncedCallback } from "use-debounce"

import Label from "@/components/ui/Label"
import { inputStyles } from "@/components/ui/TextField"
import { cn } from "@/lib/utils"

export default function SearchField({
  label,
  placeholder = "Search",
  className,
  ...props
}: Omit<RacSearchFieldProps, "className"> & {
  label?: string
  placeholder?: string
  className?: string
}) {
  const path = usePathname()
  const router = useRouter()
  const readOnlySearchParams = useSearchParams()
  const searchParams = new URLSearchParams(readOnlySearchParams)

  const onSearchChange = useDebouncedCallback((query: string) => {
    if (query !== "") {
      searchParams.set("query", query)
    } else {
      searchParams.delete("query")
    }
    router.push(`${path}?${searchParams.toString()}`)
  }, 200)

  return (
    <RacSearchField
      enterKeyHint="search"
      className={cn("group w-full", className)}
      {...props}
      defaultValue={searchParams.get("query") ?? ""}
      onChange={onSearchChange}
    >
      {({ isEmpty }) => (
        <div className="grid gap-1">
          {label && <Label>{label}</Label>}
          <div className="relative w-full">
            <PiMagnifyingGlassBold className="text-beige-500 absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2" />
            <RacInput
              placeholder={placeholder}
              className={inputStyles({
                isIcon: true,
                className: "pr-9",
              })}
            />
            {!isEmpty && (
              <RacButton className="rac-hover:cursor-pointer absolute top-1/2 right-5 -translate-y-1/2 group-empty:hidden">
                <PiXCircleFill className="text-beige-500 size-5" />
              </RacButton>
            )}
          </div>
        </div>
      )}
    </RacSearchField>
  )
}

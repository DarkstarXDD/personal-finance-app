"use client"

import {
  SearchField as RacSearchField,
  Button as RacButton,
  type SearchFieldProps as RacSearchFieldProps,
} from "react-aria-components"
import { PiXCircleFill, PiMagnifyingGlassBold } from "react-icons/pi"

import Input from "@/components/ui/Input"
import Label from "@/components/ui/Label"
import { cn } from "@/lib/utils"

type SearchFieldProps = Omit<RacSearchFieldProps, "className"> & {
  label?: string
  placeholder?: string
  className?: string
}

export default function SearchField({
  label,
  placeholder = "Search",
  className,
  ...props
}: SearchFieldProps) {
  return (
    <RacSearchField
      enterKeyHint="search"
      className={cn("w-full", className)}
      {...props}
    >
      {({ isEmpty }) => (
        <div className="grid justify-items-start gap-1.5">
          {label && <Label>{label}</Label>}

          <div className="relative w-full">
            <Input
              type="search"
              placeholder={placeholder}
              icon={PiMagnifyingGlassBold}
            />

            {!isEmpty && (
              <RacButton className="rac-hover:cursor-pointer text-fg-quaternary rac-pressed:text-fg-quaternary_hover rac-hover:text-fg-quaternary_hover absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full p-1 outline-none">
                <PiXCircleFill className="size-5" />
              </RacButton>
            )}
          </div>
        </div>
      )}
    </RacSearchField>
  )
}

"use client"

import {
  Button as RacButton,
  type ButtonProps as RacButtonProps,
} from "react-aria-components"
import { IoCloseCircleOutline } from "react-icons/io5"

import { buttonStyles } from "@/components/ui/Button"

export default function CloseButton(
  props: Omit<RacButtonProps, "children" | "className">
) {
  return (
    <RacButton
      aria-label="Close"
      {...props}
      className={buttonStyles({
        className:
          "ring-beige-500 text-grey-500 rac-pressed:text-beige-500 rac-hover:text-beige-500 size-7 rounded-full bg-transparent p-0",
      })}
    >
      <IoCloseCircleOutline className="size-7 shrink-0" />
    </RacButton>
  )
}

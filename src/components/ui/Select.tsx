"use client"

import { motion } from "motion/react"
import {
  Select as RacSelect,
  Button as RacButton,
  SelectValue as RacSelectValue,
  Popover as RacPopover,
  ListBox as RacListBox,
  ListBoxItem as RacListBoxItem,
  Text as RacText,
  FieldError as RacFieldError,
  type SelectProps as RacSelectProps,
  type ListBoxItemProps as RacListBoxItemProps,
} from "react-aria-components"
import { FaCheck } from "react-icons/fa6"
import { PiCaretDownFill, PiSortAscendingFill } from "react-icons/pi"
import { tv, type VariantProps } from "tailwind-variants"

import Label, { type LabelVariants } from "@/components/ui/Label"

import type { ReactNode } from "react"

const MotionPiCaretDownFill = motion.create(PiCaretDownFill)

const selectStyles = tv({
  slots: {
    layoutWrapper: "flex",
    fieldLabel: "",
    button:
      "rac-focus-visible:ring-2 text-grey-900 ring-beige-500 cursor-pointer outline-none sm:w-full",
    buttonSpan:
      "border-beige-500 w-full items-center justify-between gap-2 rounded-lg border px-5 py-3 text-start text-sm leading-normal font-normal",
    mobileIcon: "size-5",
    popoverDiv:
      "border-grey-200 w-(--trigger-width) rounded-lg border bg-white px-1 py-1 shadow-xl",
  },

  variants: {
    layout: {
      vertical: {
        layoutWrapper: "flex-col items-start gap-1",
      },
      horizontal: {
        layoutWrapper: "flex-row items-center gap-2",
      },
    },

    shouldHideOnMobile: {
      true: {
        fieldLabel: "sr-only sm:not-sr-only",
        button: "rounded sm:rounded-lg",
        buttonSpan: "hidden sm:flex",
        mobileIcon: "block sm:hidden",
        popoverDiv: "min-w-50 sm:max-w-full",
      },
      false: {
        mobileIcon: "hidden",
        button: "w-full rounded-lg",
        buttonSpan: "flex",
      },
    },
  },

  defaultVariants: {
    layout: "vertical",
    shouldHideOnMobile: false,
  },
})

const {
  layoutWrapper,
  fieldLabel,
  button,
  buttonSpan,
  mobileIcon,
  popoverDiv,
} = selectStyles()

type SelectStyles = VariantProps<typeof selectStyles>

type SelectProps<T extends object> = Omit<
  RacSelectProps<T>,
  "children" | "className"
> & {
  label?: string
  labelVariant?: LabelVariants["variant"]
  description?: string
  errorMessage?: string
  items?: Iterable<T>
  className?: string
  children?: ReactNode | ((item: T) => ReactNode)
} & SelectStyles

export function Select<T extends object>({
  label,
  labelVariant,
  description,
  errorMessage,
  isInvalid,
  items,
  layout,
  shouldHideOnMobile,
  children,
  ...props
}: SelectProps<T>) {
  return (
    <RacSelect isInvalid={isInvalid} {...props}>
      {({ isOpen }) => (
        <>
          <div className={layoutWrapper({ layout })}>
            <Label
              variant={labelVariant}
              className={fieldLabel({ shouldHideOnMobile })}
            >
              {label}
            </Label>

            <RacButton className={button({ shouldHideOnMobile })}>
              <span className={buttonSpan({ shouldHideOnMobile })}>
                <RacSelectValue />
                <MotionPiCaretDownFill
                  className="text-grey-500 shrink-0"
                  animate={isOpen ? "open" : "closed"}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  variants={{
                    open: { rotate: 180 },
                    closed: { rotate: 0 },
                  }}
                />
              </span>
              <PiSortAscendingFill
                className={mobileIcon({ shouldHideOnMobile })}
              />
            </RacButton>
          </div>
          {description && !isInvalid && (
            <RacText slot="description">{description}</RacText>
          )}
          <RacFieldError>{errorMessage}</RacFieldError>

          <RacPopover>
            <motion.div
              initial={{ y: -12, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
              className={popoverDiv({ shouldHideOnMobile })}
            >
              <RacListBox className="outline-none" items={items}>
                {children}
              </RacListBox>
            </motion.div>
          </RacPopover>
        </>
      )}
    </RacSelect>
  )
}

const selectItemStyles = tv({
  base: "rac-focus-visible:bg-beige-300 rac-pressed:bg-beige-300 rac-selected:bg-beige-300 rac-selected:font-bold rac-hover:bg-beige-300 text-grey-900 cursor-pointer rounded-md px-4 py-3 text-sm leading-normal font-normal outline-none",
})

export function SelectItem({
  className,
  children,
  ...props
}: Omit<RacListBoxItemProps, "children" | "className"> & {
  children: ReactNode
  className?: string
}) {
  return (
    <RacListBoxItem
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      className={selectItemStyles({ className })}
    >
      {({ isSelected }) => (
        <div className="flex w-full items-center justify-between gap-6">
          {children}
          {isSelected && (
            <FaCheck className="text-grey-500 size-3.5 shrink-0" />
          )}
        </div>
      )}
    </RacListBoxItem>
  )
}

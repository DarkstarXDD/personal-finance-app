"use client"

import { motion } from "motion/react"
import {
  Select as RacSelect,
  Button as RacButton,
  SelectValue as RacSelectValue,
  Popover as RacPopover,
  ListBox as RacListBox,
  ListBoxItem as RacListBoxItem,
  type SelectProps as RacSelectProps,
  type ListBoxItemProps as RacListBoxItemProps,
} from "react-aria-components"
import {
  PiCheckBold,
  PiCaretDownFill,
  PiSortAscendingFill,
} from "react-icons/pi"
import { tv, type VariantProps } from "tailwind-variants"

import FieldDescription from "@/components/ui/FieldDescription"
import FieldError from "@/components/ui/FieldError"
import Label, { type LabelVariants } from "@/components/ui/Label"

import type { ReactNode, Ref } from "react"

const MotionPiCaretDownFill = motion.create(PiCaretDownFill)

const selectStyles = tv({
  slots: {
    outerWrapper: "group",
    innerWrapper: "grid justify-items-start gap-1",
    fieldLabel: "",
    fieldDescription: "",
    fieldErrorMessage: "",
    button:
      "rac-focus-visible:ring-2 group rac-disabled:opacity-40 text-grey-900 ring-beige-500 group-rac-invalid:ring-red cursor-pointer outline-none sm:w-full",
    buttonSpan:
      "border-beige-500 group-rac-invalid:border-red w-full items-center justify-between gap-2 rounded-lg border px-5 py-3 text-start text-sm leading-normal font-normal",
    mobileIcon: "size-5",
    popoverDiv:
      "border-grey-200 max-h-80 w-(--trigger-width) overflow-auto rounded-lg border bg-white px-1 py-1 shadow-xl",
  },

  variants: {
    shouldHideOnMobile: {
      true: {
        innerWrapper: "grid-cols-1 [grid-template-areas:none]",
        fieldLabel: "sr-only sm:not-sr-only",
        fieldDescription: "sr-only sm:not-sr-only",
        fieldErrorMessage: "sr-only sm:not-sr-only",
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

  defaultVariants: { shouldHideOnMobile: false },
})

const {
  outerWrapper,
  innerWrapper,
  fieldLabel,
  button,
  buttonSpan,
  mobileIcon,
  popoverDiv,
  fieldDescription,
  fieldErrorMessage,
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
  children?: ReactNode | ((item: T) => ReactNode)
  ref?: Ref<HTMLDivElement>
  className?: string
} & SelectStyles

function Select<T extends object>({
  label,
  labelVariant,
  description,
  errorMessage,
  isInvalid,
  items,
  shouldHideOnMobile,
  children,
  ref,
  className,
  ...props
}: SelectProps<T>) {
  return (
    <RacSelect
      isInvalid={isInvalid}
      {...props}
      className={outerWrapper({ className })}
      ref={ref}
    >
      {({ isOpen }) => (
        <>
          <div className={innerWrapper({ shouldHideOnMobile })}>
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
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
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

            {description && !isInvalid && (
              <FieldDescription
                className={fieldDescription({ shouldHideOnMobile })}
              >
                {description}
              </FieldDescription>
            )}
            <FieldError className={fieldErrorMessage({ shouldHideOnMobile })}>
              {errorMessage}
            </FieldError>
          </div>

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
  base: "rac-focus-visible:bg-beige-100 rac-pressed:bg-beige-300 rac-selected:bg-beige-300 rac-selected:font-bold rac-hover:bg-beige-100 text-grey-900 cursor-pointer rounded-md px-4 py-3 text-sm leading-normal font-normal outline-none",
})

function SelectItem({
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
            <PiCheckBold className="text-grey-500 size-4 shrink-0" />
          )}
        </div>
      )}
    </RacListBoxItem>
  )
}

export { Select, SelectItem }

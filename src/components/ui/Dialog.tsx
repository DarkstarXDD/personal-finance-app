"use client"

import { motion } from "motion/react"
import {
  DialogTrigger as RacDialogTrigger,
  ModalOverlay as RacModalOverlay,
  Modal as RacModal,
  Dialog as RacDialog,
  Heading as RacHeading,
  type ModalOverlayProps as RacModalOverlayProps,
  type DialogRenderProps as RacDialogRenderProps,
} from "react-aria-components"

import Card from "@/components/ui/Card"
import IconButton from "@/components/ui/IconButton"

import type { ReactNode } from "react"

const MotionRacModal = motion.create(RacModal)

function DialogTrigger(props: { children: ReactNode }) {
  return <RacDialogTrigger {...props} />
}

function Dialog({
  title,
  children,
  role,
  ...props
}: Omit<RacModalOverlayProps, "children"> & {
  title: string
  children?: ReactNode | ((opts: RacDialogRenderProps) => ReactNode)
  role?: "dialog" | "alertdialog"
}) {
  return (
    <RacModalOverlay
      {...props}
      className="bg-grey-900/50 fixed inset-0 flex flex-col items-center justify-center p-5"
    >
      <MotionRacModal
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-[35rem]"
      >
        <RacDialog className="outline-none" role={role}>
          {(dialogRenderProps) => (
            <Card theme="light" padding="lg">
              <div className="mb-6 flex items-center justify-between gap-2 md:mb-5">
                <RacHeading
                  slot="title"
                  className="text-grey-900 text-xl leading-tight font-bold md:text-3xl"
                >
                  {title}
                </RacHeading>
                <IconButton variant="close" slot="close" />
              </div>
              {typeof children === "function"
                ? children(dialogRenderProps)
                : children}
            </Card>
          )}
        </RacDialog>
      </MotionRacModal>
    </RacModalOverlay>
  )
}

export { DialogTrigger, Dialog }

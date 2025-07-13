import { motion } from "motion/react"
import {
  Button as RacButton,
  DialogTrigger as RacDialogTrigger,
  ModalOverlay as RacModalOverlay,
  Modal as RacModal,
  Dialog as RacDialog,
  Heading as RacHeading,
  type ModalOverlayProps as RacModalOverlayProps,
} from "react-aria-components"
import { IoCloseCircleOutline } from "react-icons/io5"

import Card from "@/components/ui/Card"

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
  children: ReactNode
  role?: "dialog" | "alertdialog"
}) {
  return (
    <RacModalOverlay
      {...props}
      className="bg-grey-900/50 fixed inset-0 flex flex-col items-center justify-center p-5"
    >
      <MotionRacModal
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="w-full max-w-[35rem]"
      >
        <RacDialog className="outline-none" role={role}>
          <Card theme="light" padding="lg">
            <div className="mb-6 flex items-center justify-between gap-2 md:mb-5">
              <RacHeading
                slot="title"
                className="text-grey-900 text-xl leading-tight font-bold md:text-3xl"
              >
                {title}
              </RacHeading>
              <RacButton
                slot="close"
                aria-label="Close"
                className="rac-focus-visible:ring-2 ring-beige-500 text-grey-500 rac-pressed:text-beige-500 rac-hover:text-beige-500 cursor-pointer rounded-full transition-colors outline-none"
              >
                <IoCloseCircleOutline className="size-7 shrink-0" />
              </RacButton>
            </div>
            {children}
          </Card>
        </RacDialog>
      </MotionRacModal>
    </RacModalOverlay>
  )
}

export { DialogTrigger, Dialog }

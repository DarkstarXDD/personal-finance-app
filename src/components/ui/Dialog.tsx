import { motion } from "motion/react"
import {
  DialogTrigger as RacDialogTrigger,
  ModalOverlay as RacModalOverlay,
  Modal as RacModal,
  Dialog as RacDialog,
  Heading as RacHeading,
  type ModalOverlayProps as RacModalOverlayProps,
} from "react-aria-components"

import Card from "@/components/ui/Card"
import CloseButton from "@/components/ui/CloseButton"

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
  children?: ReactNode
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
              <CloseButton slot="close" />
            </div>
            {children}
          </Card>
        </RacDialog>
      </MotionRacModal>
    </RacModalOverlay>
  )
}

export { DialogTrigger, Dialog }

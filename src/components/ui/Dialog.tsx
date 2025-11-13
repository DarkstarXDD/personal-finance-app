"use client"

import { motion } from "motion/react"
import { type ReactNode } from "react"
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

const MotionRacModal = motion.create(RacModal)

// ============================================
// ============== Dialog Ttigger ==============
// ============================================

type DialogTriggerProps = { children: ReactNode }

function DialogTrigger(props: DialogTriggerProps) {
  return <RacDialogTrigger {...props} />
}

// ============================================
// ================== Dialog ==================
// ============================================

type DialogProps = Omit<RacModalOverlayProps, "children"> & {
  title: string
  description?: string
  children?: ReactNode | (({ close }: RacDialogRenderProps) => ReactNode)
  role?: "dialog" | "alertdialog"
}

function Dialog({ title, description, children, role, ...props }: DialogProps) {
  return (
    <RacModalOverlay
      {...props}
      className="bg-overlay/70 fixed inset-0 flex flex-col items-center justify-center overflow-y-auto p-5 transition-all duration-700"
    >
      <MotionRacModal
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="w-full max-w-lg will-change-transform"
      >
        <RacDialog className="outline-none" role={role}>
          {(dialogRenderProps) => (
            <Card size="md">
              <div className="mb-6 grid grid-cols-[1fr_auto] gap-2">
                <RacHeading
                  slot="title"
                  className="text-primary text-2xl leading-tight font-semibold"
                >
                  {title}
                </RacHeading>

                <IconButton variant="close" slot="close" />

                <p className="text-tertiary text-sm">{description}</p>
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

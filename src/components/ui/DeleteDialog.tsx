"use client"

import { motion } from "motion/react"
import { useActionState, type ReactNode } from "react"
import {
  DialogTrigger as RacDialogTrigger,
  ModalOverlay as RacModalOverlay,
  Modal as RacModal,
  Dialog as RacDialog,
  Heading as RacHeading,
  type ModalOverlayProps as RacModalOverlayProps,
  type DialogRenderProps as RacDialogRenderProps,
} from "react-aria-components"
import { PiTrashBold as TrashIcon } from "react-icons/pi"

import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import IconButton from "@/components/ui/IconButton"

const MotionRacModal = motion.create(RacModal)

// ============================================
// ============== Dialog Ttigger ==============
// ============================================

type DialogTriggerProps = { children: ReactNode }

function DeleteDialogTrigger(props: DialogTriggerProps) {
  return <RacDialogTrigger {...props} />
}

// ============================================
// ================== Dialog ==================
// ============================================

type DialogProps = Omit<RacModalOverlayProps, "children"> & {
  title: string
  description?: string
  action: (
    prev: string | null | undefined,
    formData: FormData
  ) => Promise<string | null | undefined>
  itemId?: string | number
  children?: ReactNode | (({ close }: RacDialogRenderProps) => ReactNode)
}

function DeleteDialog({
  title,
  description,
  action,
  itemId,
  children,
  ...props
}: DialogProps) {
  const [error, deleteAction, isPending] = useActionState(action, undefined)

  return (
    <RacModalOverlay
      {...props}
      className="bg-overlay/70 fixed inset-0 flex flex-col items-center justify-center overflow-y-auto p-5 transition-all duration-700"
    >
      <MotionRacModal
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="w-full max-w-xs will-change-transform md:max-w-sm"
      >
        <RacDialog className="outline-none" role="alertdialog">
          {(dialogRenderProps) => (
            <Card size="md" className="grid gap-5">
              <form className="grid gap-8" action={deleteAction}>
                <div className="grid gap-4">
                  <div className="flex items-start justify-between">
                    <div className="bg-error-secondary text-fg-error-primary flex size-12 items-center justify-center rounded-full">
                      <TrashIcon className="size-6" />
                    </div>
                    <IconButton variant="close" slot="close" />
                  </div>

                  <div className="grid gap-1">
                    <RacHeading
                      slot="title"
                      className="text-primary text-lg leading-tight font-semibold"
                    >
                      {title}
                    </RacHeading>
                    <div className="grid gap-4">
                      <p className="text-tertiary text-sm">{description}</p>

                      <input name="itemId" value={itemId} type="hidden" />

                      {typeof children === "function"
                        ? children(dialogRenderProps)
                        : children}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {error && (
                    <p className="text-error-primary text-sm" role="alert">
                      {error}
                    </p>
                  )}

                  <div className="flex w-full flex-col gap-3 md:flex-row">
                    <Button
                      slot="close"
                      variant="secondary"
                      size="md"
                      className="w-full"
                      isDisabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      type="submit"
                      size="md"
                      className="w-full"
                      isPending={isPending}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          )}
        </RacDialog>
      </MotionRacModal>
    </RacModalOverlay>
  )
}

export { DeleteDialogTrigger, DeleteDialog }

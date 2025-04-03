import type { ReactNode } from 'react'
import { Button } from '../ui/custom/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import HireMeForm from './hire-me-form'

export default function HireMeButton(props: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hire Me</DialogTitle>

          <DialogDescription>
            You can contact me through the form below or directly at my email:
            felipehama@gmail.com
          </DialogDescription>
        </DialogHeader>

        <HireMeForm />
      </DialogContent>
    </Dialog>
  )
}

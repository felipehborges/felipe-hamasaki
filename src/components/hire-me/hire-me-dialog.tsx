import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import HireMeForm from './hire-me-form'

interface HireMeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function HireMeDialog(props: HireMeDialogProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      {/* <DialogTrigger asChild></DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hire Me</DialogTitle>

          <DialogDescription>
            This form will send an email to me (felipehama@gmail.com).
            <br />I will get back to you as soon as possible!
          </DialogDescription>
        </DialogHeader>

        <HireMeForm />
      </DialogContent>
    </Dialog>
  )
}

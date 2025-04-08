import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '../ui/dialog'
import ContactMeForm from './contact-me-form'

interface ContactMeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ContactMeDialog(props: ContactMeDialogProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      {/* <DialogTrigger asChild></DialogTrigger> */}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>

          <DialogDescription>
            This form will send an email to me (felipehama@gmail.com).
            <br />I will get back to you as soon as possible!
          </DialogDescription>
        </DialogHeader>

        <ContactMeForm />
      </DialogContent>
    </Dialog>
  )
}

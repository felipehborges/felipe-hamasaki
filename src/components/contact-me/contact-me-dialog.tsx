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
          <DialogTitle>Contact me</DialogTitle>
        </DialogHeader>

        <ContactMeForm />
      </DialogContent>
    </Dialog>
  )
}

import Button from "@/components/ui/Button"
import { DialogTrigger, Dialog } from "@/components/ui/Dialog"
import { Select, SelectItem } from "@/components/ui/Select"
import TextField from "@/components/ui/TextField"

export default function NewPotDialog() {
  return (
    <DialogTrigger>
      <Button variant="primary">+ Add New Pot</Button>
      <Dialog title="Add New Pot">
        <form className="grid gap-5">
          <p className="text-grey-500 text-sm leading-normal font-normal">
            Create a pot to set savings targets. These can help keep you on
            track as you save for special purchases.
          </p>
          <div className="grid gap-4">
            <TextField
              label="Pot Name"
              placeholder="e.g. Rainy Days"
              description="Max 30 characters"
            />
            <TextField label="Target" placeholder="e.g. 2000" />
            <Select label="Theme" placeholder="Select a color">
              <SelectItem>Red</SelectItem>
              <SelectItem>Green</SelectItem>
              <SelectItem>Purple</SelectItem>
            </Select>
          </div>
          <Button variant="primary">Add Pot</Button>
        </form>
      </Dialog>
    </DialogTrigger>
  )
}

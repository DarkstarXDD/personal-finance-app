"use client"

// import { PiCurrencyDollarSimple } from "react-icons/pi"

// import Button from "@/components/ui/Button"
// import Label from "@/components/ui/Label"
import { Select, SelectItem } from "@/components/ui/Select"
// import TextField from "@/components/ui/TextField"

export default function Home() {
  return (
    <main className="grid gap-4">
      {/* <Button className="w-full" onPress={() => console.log("Clicked!")}>
        Login
      </Button>
      <Button
        className="w-full"
        variant="secondary"
        onPress={() => console.log("Clicked!")}
      >
        Login
      </Button>
      <Button
        className="w-full"
        variant="tertiary"
        onPress={() => console.log("Clicked!")}
      >
        Login
      </Button>
      <Button
        className="w-full"
        variant="destructive"
        onPress={() => console.log("Clicked!")}
      >
        Login
      </Button>

      <Label variant="primary">Primary Label</Label>
      <Label variant="secondary">Secondary Label</Label> */}

      <Select
        name="fruits"
        label="Fruits"
        description="Pick your favorite fruit"
        layout="horizontal"
      >
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>

      <Select
        name="fruits"
        label="Fruits"
        labelVariant="secondary"
        description="Pick your favorite fruit"
        layout="horizontal"
      >
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>

      <Select
        name="fruits"
        label="Fruits"
        description="Pick your favorite fruit"
        layout="vertical"
      >
        <SelectItem>Apple</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Orange</SelectItem>
      </Select>

      {/* <TextField label="Email" />
      <TextField label="Email" icon={PiCurrencyDollarSimple} /> */}
      {/* <TextField
        label="Email"
        icon={PiCurrencyDollarSimple}
        description="Helper Text"
      />
      <TextField
        label="Email"
        icon={PiCurrencyDollarSimple}
        description="Helper Text"
        errorMessage="Field error message"
        isInvalid
        data-focus="true"
      /> */}
    </main>
  )
}

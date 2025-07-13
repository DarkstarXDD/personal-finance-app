"use client"

import Card from "@/components/ui/Card"
import { Select, SelectItem } from "@/components/ui/Select"

export default function Home() {
  return (
    <main className="grid gap-10">
      <Select
        name="fruits"
        label="Fruits"
        description="Pick your favorite fruit"
        errorMessage="Field error message"
        // isInvalid={true}
        layout="horizontal"
        // shouldHideOnMobile={true}
      >
        <SelectItem>Entertainment</SelectItem>
        <SelectItem>Banana</SelectItem>
        <SelectItem>Mango</SelectItem>
        <SelectItem>Or</SelectItem>
      </Select>

      <Card>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lacinia
          elit in iaculis vulputate. Sed pretium imperdiet ligula, sit amet
          rutrum tortor volutpat nec. Donec lobortis pharetra lectus, sed
          porttitor mauris pellentesque ut. Quisque mi mi, ornare id maximus
          nec, dignissim id arcu. Integer mollis semper sem non eleifend. Donec
          sed felis quam. Curabitur hendrerit odio ut feugiat vulputate. Sed
          vitae tincidunt nisi. Morbi orci mauris, fermentum id fringilla sit
          amet, aliquam vitae magna. Sed tempus lobortis felis. Nunc et risus
          elementum, volutpat est pretium, consequat odio. Sed vitae velit
          justo.
        </p>

        <p>
          Vestibulum suscipit arcu purus, id tempor lorem facilisis eget. Nam
          cursus velit dolor, vel ultrices massa pharetra in. Sed hendrerit in
          lectus a pulvinar. Nunc blandit justo sed hendrerit euismod. Proin ut
          tempor risus, vehicula egestas ante. Cras at risus sit amet ipsum
          pellentesque cursus. Proin eleifend eros id urna fringilla aliquet.
          Vestibulum eget sem ex. Suspendisse potenti. Phasellus condimentum
          purus lacinia varius consectetur. Duis ut orci id nisl consectetur
          convallis. Aenean auctor leo a purus convallis, id condimentum nibh
          consequat.
        </p>
      </Card>
    </main>
  )
}

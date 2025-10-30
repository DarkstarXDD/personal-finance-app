import Image from "next/image"

import BrandLogo from "@/components/icons/BrandLogo"

import brandImage from "../../../../public/illustration-authentication.svg"

export default function SideImage() {
  return (
    <div className="hidden max-w-120 p-5 lg:block">
      <div className="relative">
        <Image
          src={brandImage}
          alt=""
          priority={true}
          className="w-140 rounded-xl"
        />
        <BrandLogo className="absolute top-10 left-10" />
        <div className="absolute bottom-10 left-10 grid max-w-110 gap-6">
          <p className="text-3xl leading-tight font-bold text-white">
            Keep track of your money and save for your future
          </p>
          <p className="text-sm leading-normal font-normal text-white">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  )
}

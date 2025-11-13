import { cn } from "@/lib/utils"

export default function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-fg-brand-primary size-12", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 15V0L21.5 1.31134e-07V15H18.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 40V25H21.5V40H18.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.4754 15.404L33.082 4.79736L35.2034 6.91868L26.7181 15.404L22.4754 15.404Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.79776 33.0816L15.4044 22.475L17.5257 24.5964L6.91908 35.203L4.79776 33.0816Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.7178 24.5963L35.2031 33.0815L33.0818 35.2029L22.4752 24.5963H26.7178Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.91885 4.79727L17.5255 15.4039L15.4041 17.5252L4.79753 6.91859L6.91885 4.79727Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 18.5L40 18.5V21.5L18.5 21.5V18.5Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.62269e-07 18.5L15 18.5V21.5L0 21.5L2.62269e-07 18.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

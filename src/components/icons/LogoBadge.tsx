import { cn } from "@/lib/utils"

export default function LogoBadge({ className }: { className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-12", className)}
    >
      <g filter="url(#filter0_ddiii_2397_4835)">
        <g clipPath="url(#clip0_2397_4835)">
          <rect x="3" width="48" height="48" rx="12" fill="#0A0D12" />
          <rect
            width="48"
            height="48"
            transform="translate(3)"
            fill="url(#paint0_linear_2397_4835)"
          />
          <g filter="url(#filter1_d_2397_4835)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.875 20.25V9L28.125 9V20.25H25.875Z"
              fill="url(#paint1_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.875 39V27.75H28.125V39H25.875Z"
              fill="url(#paint2_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M28.8566 20.553L36.8115 12.598L38.4025 14.189L32.0386 20.553L28.8566 20.553Z"
              fill="url(#paint3_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.5983 33.8112L23.5533 25.8563L25.1443 27.4473L17.1893 35.4022L15.5983 33.8112Z"
              fill="url(#paint4_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M32.0384 27.4472L38.4023 33.8112L36.8114 35.4021L28.8564 27.4472H32.0384Z"
              fill="url(#paint5_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.1891 12.598L25.1441 20.5529L23.5531 22.1439L15.5982 14.1889L17.1891 12.598Z"
              fill="url(#paint6_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.875 22.875L42 22.875V25.125L25.875 25.125V22.875Z"
              fill="url(#paint7_linear_2397_4835)"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22.875L23.25 22.875V25.125L12 25.125L12 22.875Z"
              fill="url(#paint8_linear_2397_4835)"
            />
          </g>
        </g>
        <rect
          x="4"
          y="1"
          width="46"
          height="46"
          rx="11"
          stroke="url(#paint9_linear_2397_4835)"
          strokeWidth="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddiii_2397_4835"
          x="0"
          y="-3"
          width="54"
          height="57"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.162923 0 0 0 0 0.162923 0 0 0 0 0.162923 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2397_4835"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect2_dropShadow_2397_4835"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 0 0.164706 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_2397_4835"
            result="effect2_dropShadow_2397_4835"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_2397_4835"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect3_innerShadow_2397_4835"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="1.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="effect3_innerShadow_2397_4835"
            result="effect4_innerShadow_2397_4835"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1"
            operator="erode"
            in="SourceAlpha"
            result="effect5_innerShadow_2397_4835"
          />
          <feOffset />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect4_innerShadow_2397_4835"
            result="effect5_innerShadow_2397_4835"
          />
        </filter>
        <filter
          id="filter1_d_2397_4835"
          x="9"
          y="5.25"
          width="36"
          height="42"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="1.5"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_2397_4835"
          />
          <feOffset dy="2.25" />
          <feGaussianBlur stdDeviation="2.25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0 0.141176 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2397_4835"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_2397_4835"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2397_4835"
          x1="24"
          y1="5.96047e-07"
          x2="26"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0" />
          <stop offset="1" stopColor="white" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_2397_4835"
          x1="27"
          y1="9"
          x2="27"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.8" />
          <stop offset="1" stopColor="white" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_2397_4835"
          x1="27"
          y1="0"
          x2="27"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.12" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_2397_4835">
          <rect x="3" width="48" height="48" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

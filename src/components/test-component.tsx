export default function TestComponent({ label }: { label: string }) {
  return (
    <div className="bg-grey-500 max-w-40 rounded-md px-4 text-center text-white">
      {label}
    </div>
  )
}

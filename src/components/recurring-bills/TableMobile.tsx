export default function TableMobile() {
  return (
    <ul className="md:hidden">
      {Array.from({ length: 4 }).map((_, i) => (
        <li
          key={i}
          className="border-b-grey-100 grid grid-cols-[1fr_auto] border-b py-4 first:pt-0 last:border-none last:pb-0"
        >
          <h3 className="text-grey-900 text-sm leading-normal font-bold">
            Elevate Education
          </h3>
          <p className="text-grey-900 text-sm leading-normal font-bold">
            $250.00
          </p>
          <p className="text-green text-xs leading-normal font-normal">
            Monthly - 1st
          </p>
        </li>
      ))}
    </ul>
  )
}

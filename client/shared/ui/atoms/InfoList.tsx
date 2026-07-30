interface InfoListProps {
  items: React.ReactNode[]
}

export default function InfoList({
  items,
}: InfoListProps) {
  return (
    <ul
      className="
        my-4
        w-fit
        list-none
        rounded-md
        border
        border-gray-200
        p-4
        shadow-sm
      "
    >
      {items?.map((item, index) => (
        <li
          key={index}
          className="
            relative
            mb-2
            pl-3
            text-sm
            text-gray-600
            last:mb-0
            before:absolute
            before:left-0
            before:text-gray-400
            before:content-['-']
          "
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
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
        list-disc
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
            ml-4
            text-sm
            leading-relaxed
            text-neutral-800
            last:mb-0
          "
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
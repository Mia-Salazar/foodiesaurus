import Image from "next/image";

interface AuthorCardProps {
    image: string,
    name: string,
    children: React.ReactNode
}

export default function AuthorCard({
  image,
  name,
  children,
}: AuthorCardProps) {
  return (
    <article
      className="
        flex
        flex-col
        gap-4
        md:flex-row-reverse
        md:items-center
      "
    >
      <figure className="shrink-0">
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          className="
            w-52
            rounded-md
            object-cover
          "
        />
      </figure>

      <div className="space-y-4">
        {children}
      </div>
    </article>
  );
}
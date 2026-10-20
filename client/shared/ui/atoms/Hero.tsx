import Image from "next/image";

interface HeroProps {
  title: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

export default function Hero({
  title,
  image = "/img/restaurant.jpg",
  imageAlt = "",
  className = "",
}: HeroProps) {
  return (
    <section className={`relative flex h-52 overflow-hidden ${className}`}>
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/70" />
      <h1
        className="
          relative z-10
          m-auto
          w-full
          px-4
          text-center
          text-4xl
          font-bold
          text-white
          font-teko
          tracking-wide
        "
      >
        {title}
      </h1>
    </section>
  );
}

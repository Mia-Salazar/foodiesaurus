interface HeroProps {
  title: string,
  image?: string,
  className?: string
}

export default function Hero({
  title,
  image = "/images/happy.jpg",
  className = "",
}: HeroProps) {
  return (
    <section
      className={`
        relative flex h-52 bg-cover bg-center
        ${className}
      `}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <h1
        className="
          relative z-10
          m-auto
          text-center
          text-3xl
          font-bold
          text-white
          font-teko
        "
      >
        {title}
      </h1>
    </section>
  );
}
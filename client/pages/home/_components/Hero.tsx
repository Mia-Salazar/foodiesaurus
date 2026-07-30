import Image from "next/image";

export default function Hero() {
  return (
    <section className="
      relative
      bg-foodiesaurus
      px-4
      py-5
      h-48
      md:h-80
    ">
      <div className="
        max-w-5xl
        mx-auto
        md:grid
        md:grid-cols-2
        md:items-center
      ">

        <div className="max-w-lg">
          <h1 className="
            text-white
            text-3xl
            font-bold
            mb-6
            md:text-5xl
          ">
            Encuentra restaurantes seguros para alergias alimentarias
          </h1>

          <p className="text-white">
            La única plataforma donde puedes valorar establecimientos
            de comida según cómo tratan las alergias y las intolerancias
          </p>
        </div>

        <div className="
          hidden
          md:block
          relative
          h-72
        ">
          <Image
            src="/img/poke.png"
            alt="Poke"
            fill
            sizes="50vw"
            className="object-contain"
          />
        </div>

      </div>
    </section>
  );
}
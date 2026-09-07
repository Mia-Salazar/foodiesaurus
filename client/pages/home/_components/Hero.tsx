import Image from "next/image";

export default function Hero() {
  return (
    <section className="
      relative
      px-4
      pt-10
      pb-0
      md:h-80
      lg:h-95
      md:my-10
    ">
      <div className="
        max-w-5xl
        mx-auto
        md:grid
        md:grid-cols-2
        md:items-center
      ">

        <figure
          className="
            h-30
            relative
            md:h-72
            lg:h-80
            mb-4
          "
        >
          <Image
            src="/img/foodiesaurus-v4.png"
            alt="Rita, la dinosaurita, comiendo pizza"
            fill
            sizes="50vw"
            className="object-contain"
          />
        </figure>

        <div className="max-w-lg">
          <h1 className="
            text-3xl
            font-bold
            leading-tight
            mb-6
            md:text-5xl
          ">
            ¡El meteorito no me extinguió, pero unas <span className="inline-block leading-none pb-2 text-white bg-foodiesaurus-secondary">gambas</span> casi lo hacen!
          </h1>

          <h2 className="text-xl">
            <span className="font-semibold">Rita, la dinosaurita</span>, te ayuda a encontrar restaurantes 100% adaptados a tus alergias para que te ahorres el paseo en ambulancia.
          </h2>
        </div>
      </div>
    </section>
  );
}
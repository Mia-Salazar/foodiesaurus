import Image from "next/image";

export default function Hero() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto grid max-w-[56.25rem] items-center gap-6 px-4 py-8 md:grid-cols-2 md:py-10">
        <figure className="relative mx-auto h-40 w-full max-w-xs md:h-72 md:max-w-none">
          <Image
            src="/img/foodiesaurus-v4.png"
            alt="Rita, la dinosaurita, comiendo pizza"
            fill
            sizes="(min-width: 768px) 28rem, 20rem"
            className="object-contain"
            priority
          />
        </figure>

        <div>
          <h1 className="m-0 font-teko text-4xl font-semibold leading-tight tracking-wide md:text-5xl">
            ¡El meteorito no me extinguió, pero unas{" "}
            <span className="bg-foodiesaurus-secondary px-1.5 text-white">
              gambas
            </span>{" "}
            casi lo hacen!
          </h1>
          <p className="mt-4 mb-0 text-neutral-800">
            <span className="font-semibold">Rita, la dinosaurita</span> te
            ayuda a encontrar restaurantes seguros si tienes alergia.
          </p>
        </div>
      </div>
    </header>
  );
}

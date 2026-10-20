import Image from "next/image";

const items = [
  "Buscar por nombre y ciudad (Sevilla, Madrid y Barcelona de momento)",
  <>
    Consulta opiniones de otros <strong>foodies</strong>
  </>,
  <>
    Comprueba si la <strong>carta de alérgenos</strong> es de fiar
  </>,
  <>
    O si alguien ha reportado una <strong>reacción alérgica</strong>
  </>,
  "Ve al restaurante y disfruta la comida",
  <>
    Y no te olvides de <strong>puntuar la experiencia</strong> para ayudar a otros
  </>,
];

export default function Instructions() {
  return (
    <section className="p-5 md:grid md:grid-cols-2 md:items-center md:gap-8">
      <figure className="m-0 mb-6 flex justify-center md:mb-0">
        <Image
          src="/img/poke.png"
          alt=""
          width={500}
          height={500}
          className="max-h-72 w-auto max-w-full object-contain"
        />
      </figure>

      <div>
        <h2 className="mb-5 text-2xl font-semibold">
          ¿Quieres saber si un restaurante es seguro para ti?
        </h2>
        <ol className="m-0 list-none space-y-3 p-0">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span
                className="
                  mt-0.5
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-foodiesaurus/10
                  font-teko
                  text-xl
                  font-semibold
                  text-foodiesaurus
                "
              >
                {index + 1}
              </span>
              <p className="m-0 pt-1.5 text-sm text-neutral-700">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

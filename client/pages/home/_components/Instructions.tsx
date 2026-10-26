import Image from "next/image";

const items = [
  "Busca por nombre y por provincia. Ahora hay Madrid, Barcelona y Sevilla.",
  "Lee las opiniones de otras personas con alergia.",
  "Mira si el restaurante tiene carta de alérgenos. La carta de alérgenos es la lista de ingredientes que pueden dar alergia.",
  "Mira si alguien ha tenido una reacción alérgica.",
  "Si te encaja, ve al restaurante y come con más calma.",
  "Después, deja tu puntuación. Así ayudas a más personas.",
];

export default function Instructions() {
  return (
    <section className="p-5 md:grid md:grid-cols-2 md:items-center md:gap-8">
      <figure className="m-0 mb-6 flex justify-center md:mb-0">
        <Image
          src="/img/poke.png"
          alt="Un bol de poke"
          width={576}
          height={576}
          sizes="(min-width: 768px) 18rem, 16rem"
          className="max-h-72 w-auto max-w-full object-contain"
        />
      </figure>

      <div>
        <h2 className="mb-5 text-2xl font-semibold">
          ¿Es seguro este restaurante para ti?
        </h2>
        <ol className="m-0 list-none space-y-3 p-0">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span
                className="
                  mt-0.5
                  flex
                  h-11
                  w-11
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
              <p className="m-0 pt-1.5 text-sm leading-relaxed text-neutral-800">{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

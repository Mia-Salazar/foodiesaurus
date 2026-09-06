
import Image from "next/image";

const items = [
  <>
    Buscar por nombre y ciudad (Sevilla, Madrid y Barcelona de momento)
  </>,
  <>
    Consulta opiniones de otros{" "}
    <strong>foodies</strong>
  </>,
  <>
    Comprueba si la{" "}
    <strong>carta de alérgenos</strong>{" "}
    es de fiar
  </>,
  <>
    O si alguien ha reportado una{" "}
    <strong>reacción alérgica</strong>
  </>,
  <>
    Ve al restaurante y disfruta la comida
  </>,
  <>
    Y no te olvides de <strong>puntuar la experiencia</strong>{" "}
    para ayudar a otros
  </>,
];


export default function Instructions() {

  return (

    <section
      className="
        mx-4
        my-20

        md:max-w-5xl
        md:mx-auto

        md:grid
        md:grid-cols-2

        md:gap-8
        md:items-center
      "
    >
      <figure
        className="m-0 flex justify-center"
      >
        <Image
          src="/img/poke.png"
          alt=""
          width={500}
          height={500}
          className="
            max-w-full
            max-h-full
            object-contain
            mb-4
          "
        />
      </figure>
      <div>
        <h3 className="text-white text-3xl font-semibold mb-4">
          <span className="leading-relaxed bg-foodiesaurus-secondary bg-contain px-2 py-1 box-decoration-clone">
            ¿Quieres saber si un restaurante es seguro para ti?
          </span>
        </h3>
        <ol
          className="
            list-decimal
            pl-5
            space-y-3
            text-lg
            leading-7
          "
        >
          {
            items.map((item,index)=>(
              <li key={index}>
                {item}
              </li>
            ))
          }

        </ol>
      </div>

    </section>
  );
}
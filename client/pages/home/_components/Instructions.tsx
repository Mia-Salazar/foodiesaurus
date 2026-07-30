
import Image from "next/image";

const items = [
  <>
    Buscar por nombre, ciudad o tipo de comida
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
    <strong>Puntúa la experiencia</strong>{" "}
    y ayuda a otros
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
          src="/img/middle.jpg"
          alt=""
          width={500}
          height={500}
          className="
            max-w-full
            max-h-full
            object-contain
          "
        />
      </figure>
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
    </section>
  );
}
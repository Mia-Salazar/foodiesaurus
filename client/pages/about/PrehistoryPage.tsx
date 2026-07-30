import ContentSection from "@/client/shared/ui/atoms/ContentSection";
import Hero from "@/client/shared/ui/atoms/Hero";
import InfoList from "@/client/shared/ui/atoms/InfoList";
import LinkText from "@/client/shared/ui/atoms/LinkText";
import AuthorCard from "@/client/pages/about/_components/AuthorCard";

const allergyStats: React.ReactNode[] = [
    <>
        Entre un{" "}
        <LinkText href="https://www.quironsalud.com">
        20 y un 25% de la población posee algún tipo de alergia alimentaria
        </LinkText>
    </>,
    <>
        Se estima que un{" "}
        <LinkText href="https://www.medicalnewstoday.com/articles/180120">
        68% de la población mundial tiene problemas para digerir la lactosa
        </LinkText>
    </>,
    <>
        <LinkText href="https://www.beyondceliac.org/celiac-disease/facts-and-figures/">
        Un 1% de las personas son celíacas
        </LinkText>
    </>
];

const foodiesaurusPoints: React.ReactNode[] = [
    "Si un restaurante tenía carta de alérgenos y cómo de fiable era.",
    "La atención del personal de cocina y sala ante necesidades dietéticas.",
    "Las opciones alimentarias disponibles.",
    "Si existían reacciones adversas relacionadas con platos.",
    "Si se tenían en cuenta necesidades de personas con discapacidad.",
];

export default function PrehistoryPage() {
  return (
    <main>
      <Hero
        title="Prehistoria"
        image="/img/restaurant.jpg"
      />
      <ContentSection>
        <h2 className="mb-4 text-2xl font-bold">
          El contexto
        </h2>
        <p>
          En diciembre de 2014 entró en vigor en la Unión Europea la{" "}
          <LinkText href="https://www.boe.es/doue/2011/304/L00018-00063.pdf">
            normativa 1169/2011
          </LinkText>
          .
        </p>
        <p>
          Esta normativa respondía a la diversidad de personas y
          sus diferentes tipos de dietas.
        </p>
        <p>
          Se regulaba que todos los locales de restauración
          tuviesen una carta de alérgenos indicando los 14
          alérgenos reconocidos.
        </p>
        <p>
          Algunos datos importantes:
        </p>
        <InfoList items={allergyStats}/>
        <p>
          Conocer los ingredientes de los platos es fundamental
          para evitar reacciones alérgicas y problemas derivados
          de la alimentación.
        </p>
        <h2 className="mt-8 mb-4 text-2xl font-bold">
          La autora
        </h2>
        <AuthorCard
          name="Mia Salazar"
          image="/img/me.jpg"
        >
          <p>
            Soy Mia Salazar, creadora de Foodiesaurus y
            Front-end developer especializada en accesibilidad.
          </p>

          <p>
            La idea nació por mi propia experiencia con
            intolerancias y alergias alimentarias.
          </p>

          <p>
            Posteriormente amplié la idea para incluir
            otras necesidades como diabetes, veganismo,
            vegetarianismo o discapacidad.
          </p>

        </AuthorCard>
        <p className="mt-6">
          La plataforma gira alrededor de 5 ejes:
        </p>
        <InfoList
          items={foodiesaurusPoints}
        />
        <p>
          Si deseas conocer la historia completa puedes ver{" "}
          <LinkText href="https://www.youtube.com/watch?v=CpuxfoV71E0">
            este vídeo
          </LinkText>
          .
        </p>
        <p>
          Actualmente Foodiesaurus sigue creciendo y
          añadiendo funcionalidades.
        </p>
        <p>
          Gracias por leer y contribuir en Foodiesaurus.
        </p>
      </ContentSection>
    </main>
  );
}
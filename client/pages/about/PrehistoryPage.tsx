import ContentSection from "@/client/shared/ui/atoms/ContentSection";
import Hero from "@/client/shared/ui/atoms/Hero";
import InfoList from "@/client/shared/ui/atoms/InfoList";
import LinkText from "@/client/shared/ui/atoms/LinkText";
import AuthorCard from "@/client/pages/about/_components/AuthorCard";

const allergyStats: React.ReactNode[] = [
  <>
    Entre un 20 y un 25% de las personas tiene alergia a algún alimento.{" "}
    <LinkText href="https://www.quironsalud.com">Fuente de Quirónsalud</LinkText>
  </>,
  <>
    Un 68% de las personas del mundo tiene problemas para digerir la lactosa.{" "}
    <LinkText href="https://www.medicalnewstoday.com/articles/180120">
      Fuente de Medical News Today
    </LinkText>
  </>,
  <>
    Un 1% de las personas es celíaca.{" "}
    <LinkText href="https://www.beyondceliac.org/celiac-disease/facts-and-figures/">
      Fuente de Beyond Celiac
    </LinkText>
  </>,
];

const foodiesaurusPoints: React.ReactNode[] = [
  "Si el restaurante tenía carta de alérgenos. Y si esa lista era de fiar.",
  "Cómo te trata el personal de cocina y de sala si dices que tienes alergia.",
  "Qué platos hay para cada dieta.",
  "Si alguien se puso malo después de comer.",
  "Si el local pensaba en personas con discapacidad.",
];

export default function PrehistoryPage() {
  return (
    <>
      <Hero
        title="Prehistoria"
        image="/img/restaurant.jpg"
        imageAlt="Interior de un restaurante"
      />
      <ContentSection>
        <h2 className="mb-4 text-2xl font-bold">El contexto</h2>
        <p>
          En diciembre de 2014 empezó a valer en la Unión Europea la{" "}
          <LinkText href="https://www.boe.es/doue/2011/304/L00018-00063.pdf">
            norma 1169/2011
          </LinkText>
          .
        </p>
        <p>Esa norma mira las dietas de cada persona.</p>
        <p>
          Dice que los restaurantes deben tener una carta de alérgenos. La
          carta de alérgenos es la lista de 14 ingredientes que pueden dar
          alergia.
        </p>
        <p>Algunos datos importantes:</p>
        <InfoList items={allergyStats} />
        <p>
          Saber los ingredientes ayuda a evitar una reacción alérgica.
        </p>
        <h2 className="mt-8 mb-4 text-2xl font-bold">La autora</h2>
        <AuthorCard name="Mia Salazar" image="/img/me.jpg">
          <p>
            Soy Mia Salazar. He creado Foodiesaurus. Trabajo con páginas web y
            con accesibilidad.
          </p>
          <p>
            La idea salió de mi vida con intolerancias y alergias a la comida.
          </p>
          <p>
            Luego ampliamos la idea. También miramos diabetes, veganismo,
            vegetarianismo y discapacidad.
          </p>
        </AuthorCard>
        <p className="mt-6">Foodiesaurus mira 5 cosas:</p>
        <InfoList items={foodiesaurusPoints} />
        <p>
          Si quieres la historia completa, puedes ver el{" "}
          <LinkText href="https://www.youtube.com/watch?v=CpuxfoV71E0">
            vídeo de YouTube sobre Foodiesaurus
          </LinkText>
          .
        </p>
        <p>Foodiesaurus sigue creciendo y suma funciones nuevas.</p>
        <p>Gracias por leer y por ayudar en Foodiesaurus.</p>
      </ContentSection>
    </>
  );
}

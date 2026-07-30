import RestaurantSearchForm from "./_components/RestaurantSearchForm";
import QuestionBanner from "./_components/QuestionBanner";
import Instructions from "./_components/Instructions";
import Hero from "./_components/Hero";

export function HomePage() {
  return (
    <>
      <Hero />

      <RestaurantSearchForm />

      <QuestionBanner />

      <Instructions />
    </>
  )
}
import RestaurantSearchForm from "./_components/RestaurantSearchForm";
import Instructions from "./_components/Instructions";
import Hero from "./_components/Hero";

export function HomePage() {
  return (
    <div className="bg-neutral-50">
      <Hero />
      <RestaurantSearchForm />
      <div className="mx-auto max-w-[56.25rem] px-4 py-8">
        <Instructions />
      </div>
    </div>
  );
}

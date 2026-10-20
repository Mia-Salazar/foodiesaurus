interface RestaurantMapProps {
  name: string;
  latitude: number;
  longitude: number;
}

export function RestaurantMap({ name, latitude, longitude }: RestaurantMapProps) {
  const delta = 0.008;
  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ].join(",");
  const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${latitude},${longitude}`;
  const openSrc = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;

  return (
    <figure className="mx-auto mt-6 max-w-[56.25rem] px-4 md:mt-8">
      <div className="relative h-56 max-w-[28.125rem] overflow-hidden rounded-md border border-neutral-200">
        <iframe
          title={`Mapa de ${name}`}
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
      <figcaption className="mt-2 text-sm">
        <a
          href={openSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foodiesaurus underline hover:opacity-80"
        >
          Ver en OpenStreetMap
        </a>
      </figcaption>
    </figure>
  );
}

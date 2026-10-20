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
    <figure className="flex h-full min-h-64 flex-col overflow-hidden rounded-md border border-neutral-200 bg-white shadow-sm">
      <div className="relative min-h-64 flex-1 overflow-hidden">
        <iframe
          title={`Mapa de ${name}`}
          src={embedSrc}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-neutral-100 px-4 py-2.5">
        <a
          href={openSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-foodiesaurus underline hover:opacity-80"
        >
          Ver en OpenStreetMap
        </a>
      </figcaption>
    </figure>
  );
}

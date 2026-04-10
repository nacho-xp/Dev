// src/components/landing/ToursSection.tsx
import TourCard from "./tour-card";

const TOURS = [
  {
    lang: "Español",
    name: "Recorrido\nPrincipal",
    description:
      "Las obras más destacadas de la colección permanente. Desde el siglo XIX hasta el arte contemporáneo argentino.",
    duration: "60 min",
    capacity: "Hasta 15 personas",
    isAccessible: false,
    delay: "0ms",
  },
  {
    lang: "English",
    name: "Main\nTour",
    description:
      "A curated selection of the museum's most significant works, spanning Argentine and international art from the 19th century onward.",
    duration: "60 min",
    capacity: "Up to 15 people",
    isAccessible: false,
    delay: "100ms",
  },
  {
    lang: "Accesible · Español",
    name: "Recorrido\nInclusivo",
    description:
      "Diseñado para personas con deterioro visual. Narración detallada, puntos inteligentes y guía en audio por cada obra.",
    duration: "75 min",
    capacity: "Audio guiado",
    isAccessible: true,
    delay: "200ms",
  },
];

export default function ToursSection() {
  return (
    <section id="tours" className=" px-2 xl:px-14 py-15 mt-15 bg-dorado/5">

      {/* Header */}
      <div className="flex items-baseline gap-6 mb-18">
        <span className="font-serif text-[13px] tracking-widest text-dorado">01</span>
        <h2 className="font-serif font-light text-[clamp(32px,3.5vw,52px)] leading-[1.1]">
          Visitas <em className="italic text-dorado">guiadas</em>
        </h2>
        <div className="flex-2 h-px bg-rule self-center" />
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {TOURS.map((tour) => (
          <TourCard key={tour.lang} {...tour} name={tour.name.replace("\\n", "\n")} />
        ))}
      </div>

    </section>
  );
}
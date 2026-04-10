// src/components/landing/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-18 ">
      {/* ── Columna izquierda ── */}
      <section
        className="
        flex flex-col justify-center
        min-h-dvh px-2 xl:px-26 py-20
        relative
        lg:after:absolute lg:after:right-0 lg:after:top-[15%] lg:after:bottom-[15%]
        lg:after:w-px lg:after:bg-linear-to-b
        lg:after:from-transparent lg:after:via-rule lg:after:to-transparent
        lg:after:content-['']
      "
      >
        {/* Eyebrow */}
        <span
          className="
          font-sans text-xs tracking-[0.32em] uppercase text-dorado
          mb-7 opacity-0 animate-fade-up
          [animation-delay:100ms]
        "
        >
          Buenos Aires · Desde 1895
        </span>

        {/* Título */}
        <h1
          className="
          font-serif font-light leading-[1.05]
          text-6xl
          
          text-ink mb-8
          opacity-0 animate-fade-up
          [animation-delay:250ms]
        "
        >
          Museo Nacional <br />
          de <em className="italic text-dorado font-light">Bellas Artes</em>
        </h1>

        {/* Descripción */}
        <p
          className="
          text-sm leading-[1.8] text-ink-mid
          max-w-100 mb-12
          opacity-0 animate-fade-up
          [animation-delay:400ms]
        "
        >
          Un espacio de arte inclusivo donde la tecnología amplía la experiencia
          cultural. Visitas guiadas, puntos inteligentes y accesibilidad para
          todos.
        </p>

        {/* Acciones */}
        <div
          className="
          flex items-center gap-5
          opacity-0 animate-fade-up
          [animation-delay:550ms]
        "
        >
          <Link
            href="#tours"
            className=" black-button"
          >
            Ver visitas guiadas
          </Link>

          <Link
            href="#inscripcion"
            className="
              inline-block py-3.5
              font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid
              border-b border-rule
              hover:text-dorado hover:border-dorado
              transition-all duration-200
            "
          >
            Reservar turno
          </Link>
        </div>
      </section>

      {/* ── Columna derecha ── */}
      <div className="hidden lg:block relative bg-paper overflow-hidden min-h-dvh bg-dorado/20">
        {/* Marco con imagen */}
        <div className="absolute inset-15 ">
          <Image
            src="https://bellasartes.gob.ar/media/thumbs/uploads/coleccion/Kg2p9xlZW6Zw.jpg"
            alt="Obra de la colección permanente — Museo Nacional de Bellas Artes"
            fill
            className="object-cover object-center"
            priority
          />
          <p
            className="
            absolute bottom-7 left-7
            font-serif text-[12px] italic
            text-cream/50 tracking-[0.05em]
          "
          >
            Colección Permanente, Sala I
          </p>
        </div>

        {/* Stats strip */}
        <div
          className="
          absolute bottom-0 left-0 right-0
          grid grid-cols-3
          border-t border-rule
          bg-cream/60 backdrop-blur-sm
        "
        >
          {[
            { num: "12K", label: "Obras" },
            { num: "24", label: "Salas" },
            { num: "4", label: "Visitas guiadas" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`
                px-8 py-6
                ${i < 2 ? "border-r border-rule" : ""}
              `}
            >
              <p className="font-serif font-light text-[36px] leading-none text-ink mb-1">
                {stat.num}
              </p>
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-low">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

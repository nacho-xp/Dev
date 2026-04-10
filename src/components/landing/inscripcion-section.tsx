// src/components/landing/InscripcionSection.tsx
import AppointmentForm from "@/components/appointment/appointment-form";

export default function InscripcionSection() {
  return (
    <section
      id="inscripcion"
      className="bg-cream px-2 xl:px-14 py-[120px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
    >

      {/* ── Columna izquierda: formulario ── */}
      <div>
        {/* Header */}
        <div className="flex items-baseline gap-6 mb-[72px]">
          <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">02</span>
          <h2 className="font-serif font-light text-[clamp(32px,3.5vw,52px)] leading-[1.1]">
            Reservar<br />
            <em className="italic text-dorado">turno</em>
          </h2>
        </div>

        <p className="font-sans text-[14px] leading-[1.85] text-ink-mid mb-12 max-w-[480px]">
          Completá el formulario para reservar tu lugar en la visita guiada de
          tu preferencia. Confirmación por email dentro de las 24 horas.
        </p>

        <AppointmentForm />
      </div>

      {/* ── Columna derecha: bloque decorativo ── */}
      <div className="lg:sticky lg:top-24">
        <div className="bg-ink text-cream p-13">

          <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dorado mb-6">
            Información de visita
          </p>

          <h3 className="font-serif font-light text-[28px] leading-[1.3] mb-8 border-b border-cream/10 pb-8">
            Arte al alcance<br />
            de <em className="italic text-dorado-lt">todos</em>
          </h3>

          <ul className="space-y-[18px] mb-10">
            {[
              "Puntos inteligentes con narración en audio en cada sala",
              "Guías especializados en lengua de señas disponibles",
              "Acceso sin barreras en todas las instalaciones",
              "App móvil con funciones de accesibilidad integradas",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-3.5 font-sans text-[13px] leading-[1.5] text-cream/65"
              >
                <span className="inline-block w-5 h-px bg-dorado flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="border-t border-cream/10 pt-8">
            <p className="font-sans text-[9px] tracking-[0.25em] uppercase text-cream/35 mb-4">
              Horarios
            </p>
            {[
              ["Martes a viernes",    "11:00 – 20:00"],
              ["Sábados y domingos", "10:00 – 20:00"],
              ["Lunes",               "Cerrado"],
            ].map(([dia, hora]) => (
              <div
                key={dia}
                className="flex justify-between font-sans text-[12px] text-cream/55 mb-2"
              >
                <span>{dia}</span>
                <span className="text-cream/40">{hora}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
"use client";

// src/components/landing/PlansSection.tsx
import { useState } from "react";
import Image from "next/image";

const PLANS = [
  {
    id: "planta-baja",
    label: "Planta baja",
    src: "/plans/planta-baja.jpg",
  },
  {
    id: "primer-segundo",
    label: "1er y 2do piso",
    src: "/plans/primer-y-segundo-piso.jpg",
  },
];

export default function FloorPlansSection() {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <section id="planos" className="bg-cream px-14 py-[120px]">

      {/* Header */}
      <div className="flex items-baseline gap-6 mb-[72px]">
        <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">03</span>
        <h2 className="font-serif font-light text-[clamp(32px,3.5vw,52px)] leading-[1.1]">
          Planos de las <em className="italic text-dorado">instalaciones</em>
        </h2>
        <div className="flex-[2] h-px bg-rule self-center" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">

        {/* Visor del plano */}
        <div>
          {/* Tabs */}
          <div className="flex border-b border-rule mb-0">
            {PLANS.map((plan, i) => (
              <button
                key={plan.id}
                onClick={() => setActive(i)}
                className={`
                  px-6 py-3 font-sans text-[10px] tracking-[0.22em] uppercase
                  transition-all duration-200 cursor-pointer relative
                  ${active === i
                    ? "text-ink"
                    : "text-ink-low hover:text-ink-mid"}
                `}
              >
                {plan.label}
                {active === i && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-dorado" />
                )}
              </button>
            ))}

            {/* Botón zoom */}
            <button
              onClick={() => setZoomed(true)}
              className="ml-auto px-4 py-3 font-sans text-[10px] tracking-[0.2em] uppercase text-ink-low hover:text-dorado transition-colors duration-200 cursor-pointer flex items-center gap-2"
              title="Ver en pantalla completa"
            >
              <ZoomIcon />
              Ampliar
            </button>
          </div>

          {/* Imagen del plano */}
          <div className="relative border border-t-0 border-rule overflow-hidden bg-paper">
            <div className="relative w-full">
              <Image
                src={PLANS[active].src}
                alt={`Plano ${PLANS[active].label} — Museo Nacional de Bellas Artes`}
                width={1200}
                height={800}
                className="w-full h-auto block"
                priority
              />
            </div>

            {/* Label del plano encima */}
            <div className="absolute top-4 left-4">
              <span className="font-sans text-[9px] tracking-[0.24em] uppercase text-ink-low bg-cream/80 backdrop-blur-sm px-3 py-1.5 border border-rule">
                {PLANS[active].label}
              </span>
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-8">

          {/* Referencia de plantas */}
          <div className="border border-rule bg-paper p-7">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dorado mb-5">
              Distribución
            </p>

            <div className="flex flex-col gap-4">
              {[
                { piso: "Planta baja", salas: "Salas I — VIII", desc: "Arte argentino siglos XIX y XX" },
                { piso: "Primer piso",  salas: "Salas IX — XVI", desc: "Arte europeo y colección moderna" },
                { piso: "Segundo piso", salas: "Salas XVII — XXIV", desc: "Arte contemporáneo y exposiciones temporales" },
              ].map((item) => (
                <div key={item.piso} className="flex gap-4 py-3 border-b border-rule last:border-b-0">
                  <div className="w-1 flex-shrink-0 bg-dorado/40 self-stretch" />
                  <div>
                    <p className="font-serif font-light text-[16px] text-ink leading-none mb-1">
                      {item.piso}
                    </p>
                    <p className="font-sans text-[11px] text-dorado tracking-[0.08em] mb-0.5">
                      {item.salas}
                    </p>
                    <p className="font-sans text-[11px] text-ink-low leading-[1.5]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info práctica */}
          <div className="border border-rule p-7 bg-ink text-cream">
            <p className="font-sans text-[9px] tracking-[0.3em] uppercase text-dorado mb-5">
              Información práctica
            </p>
            {[
              { label: "Acceso principal", value: "Av. del Libertador 1473" },
              { label: "Ascensores",       value: "Disponibles en todas las plantas" },
              { label: "Guardarropas",     value: "Planta baja, entrada principal" },
              { label: "Cafetería",        value: "Planta baja, ala sur" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col mb-4 last:mb-0">
                <span className="font-sans text-[9px] tracking-[0.18em] uppercase text-cream/35 mb-0.5">
                  {item.label}
                </span>
                <span className="font-sans text-[12px] text-cream/70">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setZoomed(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tabs dentro del modal */}
            <div className="flex border-b border-white/10 mb-0 bg-ink">
              {PLANS.map((plan, i) => (
                <button
                  key={plan.id}
                  onClick={() => setActive(i)}
                  className={`
                    px-6 py-3 font-sans text-[10px] tracking-[0.22em] uppercase
                    transition-colors duration-200 cursor-pointer relative
                    ${active === i ? "text-cream" : "text-cream/40 hover:text-cream/70"}
                  `}
                >
                  {plan.label}
                  {active === i && (
                    <span className="absolute bottom-0 left-0 right-0 h-px bg-dorado" />
                  )}
                </button>
              ))}

              <button
                onClick={() => setZoomed(false)}
                className="ml-auto px-5 py-3 font-sans text-[10px] tracking-[0.2em] uppercase text-cream/40 hover:text-cream transition-colors duration-200 cursor-pointer flex items-center gap-2"
              >
                <CloseIcon />
                Cerrar
              </button>
            </div>

            <Image
              src={PLANS[active].src}
              alt={`Plano ${PLANS[active].label}`}
              width={1600}
              height={1100}
              className="w-full h-auto block"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5] stroke-linecap-round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.5] stroke-linecap-round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
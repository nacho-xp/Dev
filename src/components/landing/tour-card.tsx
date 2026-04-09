// src/components/landing/TourCard.tsx
import Link from "next/link";

interface TourCardProps {
  lang: string
  name: string
  description: string
  duration: string
  capacity: string
  isAccessible?: boolean
  delay?: string
}

export default function TourCard({
  lang,
  name,
  description,
  duration,
  capacity,
  isAccessible = false,
  delay = "0ms",
}: TourCardProps) {
  return (
    <Link
      href="#inscripcion"
      className="
        relative block bg-cream p-10
        border-r border-rule last:border-r-0
        gold-underline
        hover:bg-white/90
        transition-colors duration-200
        group
      "
      style={{ animationDelay: delay }}
    >
      {/* Flecha top-right */}
      <div className="
        absolute top-10 right-9
        w-8 h-8 border border-rule
        flex items-center justify-center
        group-hover:bg-ink group-hover:border-ink
        transition-all duration-200
      ">
        <ArrowIcon className="stroke-ink-low group-hover:stroke-cream transition-colors duration-200" />
      </div>

      {/* Idioma / badge */}
      <p className="
        flex items-center gap-2
        font-sans text-[9px] tracking-[0.3em] uppercase
        text-dorado mb-5
      ">
        <span className="inline-block w-4 h-px bg-dorado" />
        {lang}
      </p>

      {/* Nombre */}
      <h3 className="font-serif font-light text-[26px] leading-[1.2] text-ink mb-4">
        {name}
      </h3>

      {/* Descripción */}
      <p className="font-sans text-[13px] leading-[1.75] text-ink-mid mb-8">
        {description}
      </p>

      {/* Meta */}
      <div className="flex gap-6">
        <span className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.1em] text-ink-low">
          <ClockIcon />
          {duration}
        </span>
        <span className={`
          flex items-center gap-1.5 font-sans text-[11px] tracking-[0.1em]
          ${isAccessible ? "text-dorado" : "text-ink-low"}
        `}>
          {isAccessible ? <AudioIcon /> : <GroupIcon />}
          {capacity}
        </span>
      </div>
    </Link>
  );
}

/* ── Íconos inline (sin dependencia extra) ── */

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-3 h-3 fill-none stroke-[1.5] stroke-linecap-round ${className}`}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-dorado stroke-[1.5] stroke-linecap-round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-[1.5] stroke-linecap-round stroke-ink-low">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function AudioIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-dorado stroke-[1.5] stroke-linecap-round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  );
}
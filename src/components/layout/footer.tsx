// src/components/layout/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="
      border-t border-rule bg-paper
      px-14 py-10
      flex flex-col sm:flex-row items-center justify-between gap-4
    ">
      <span className="font-serif text-[14px] tracking-[0.12em] text-ink-mid">
        Museo Nacional de Bellas Artes
      </span>

      <span className="font-sans text-[11px] tracking-[0.05em] text-ink-low text-center">
        Av. del Libertador 1473, Buenos Aires · © 2025
      </span>

      <Link
        href="#"
        className="
          font-sans text-[11px] tracking-[0.12em] uppercase
          text-dorado border-b border-dorado/30
          hover:border-dorado transition-colors duration-200
          pb-0.5
        "
      >
        Modo accesible
      </Link>
    </footer>
  );
}
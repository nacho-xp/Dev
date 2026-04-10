// src/components/layout/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50
      flex items-center justify-between
      px-14 h-18
      bg-cream/90 backdrop-blur-md
      border-b border-rule
    ">
      <Link
        href="/"
        className="font-serif text-[15px] tracking-[0.18em] uppercase text-ink"
      >
        MNBA
      </Link>

      <ul className="flex gap-10 list-none">
        <li>
          <Link
            href="/artworks"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid hover:text-dorado transition-colors"
          >
            Colección
          </Link>
        </li>
        <li>
          <Link
            href="/#tours"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid hover:text-dorado transition-colors"
          >
            Visitas
          </Link>
        </li>
        <li>
          <Link
            href="/#inscripcion"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid hover:text-dorado transition-colors"
          >
            Reservar
          </Link>
        </li>
        <li>
          <Link
            href="/admin"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid hover:text-dorado-lt transition-colors"
          >
            Admin
          </Link>
        </li>
        <li>
          <Link
            href="/aplicacion"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-dorado hover:text-dorado-lt transition-colors"
          >
            Aplicación
          </Link>
        </li>
      </ul>
    </nav>
  );
}
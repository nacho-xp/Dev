"use client";

// src/components/layout/Navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/artworks",     label: "Colección",  gold: false },
  { href: "/#tours",       label: "Visitas",     gold: false },
  { href: "/#inscripcion", label: "Reservar",    gold: false },
  { href: "/admin",        label: "Admin",       gold: false },
  { href: "/aplicacion",   label: "Aplicación",  gold: true  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="
        fixed top-0 left-0 right-0 z-50
        flex items-center justify-between
        px-6 md:px-14 h-[72px]
        bg-cream/90 backdrop-blur-md
        border-b border-rule
      ">
        <Link href="/" className="font-serif text-[15px] tracking-[0.18em] uppercase text-ink">
          MNBA
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex gap-10 list-none">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-sans text-[11px] tracking-[0.2em] uppercase transition-colors ${link.gold ? "text-dorado hover:text-dorado-lt" : "text-ink-mid hover:text-dorado"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburguesa */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-9 h-9 text-ink-mid hover:text-ink transition-colors cursor-pointer"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel mobile */}
      <div className={`
        md:hidden fixed top-[72px] left-0 right-0 z-40
        bg-cream border-b border-rule
        transition-all duration-300 ease-out overflow-hidden
        ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
      `}>
        <ul className="flex flex-col list-none px-6 py-2">
          {LINKS.map((link, i) => (
            <li key={link.href} className={i < LINKS.length - 1 ? "border-b border-rule" : ""}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center py-4 font-sans text-[11px] tracking-[0.22em] uppercase transition-colors ${link.gold ? "text-dorado" : "text-ink-mid hover:text-dorado"}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
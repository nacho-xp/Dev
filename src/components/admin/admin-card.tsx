/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

interface AdminCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export function AdminCard({ title, description, imageUrl, href }: AdminCardProps) {
  return (
    <Link
      href={href}
      className="
        group relative overflow-hidden
        aspect-[9/16] w-full
        border border-rule
        block shadow-lg
      "
    >
      {/* Imagen de fondo con zoom en hover */}
      <img
        src={imageUrl}
        alt={title}
        className="
          absolute inset-0 w-full h-full object-cover
          transition-transform duration-500 ease-out
          group-hover:scale-110
        "
      />

      {/* Overlay oscuro base */}
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />

      {/* Gradiente inferior */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      {/* Título arriba */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <h2 className="font-serif font-light text-[22px] leading-[1.2] text-white">
          {title}
        </h2>
      </div>

      {/* Descripción abajo */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="
          w-8 h-px bg-dorado mb-3
          transition-all duration-300
          group-hover:w-14
        " />
        <p className="font-sans text-[12px] leading-[1.7] text-white/70">
          {description}
        </p>
      </div>
    </Link>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  year: string | null;
  technique: string | null;
  description: string;
  narration: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  room?: { name: string };
};

export default function ArtworkDetail({ artwork }: { artwork: Artwork }) {
  return (
    <>
      <div className="pt-18">
        {/* Subheader */}
        <div className="flex items-baseline gap-4 mb-10 border-b border-rule pb-6">
          <span className="font-serif text-[13px] tracking-widest text-dorado">
            Información
          </span>
          <h2 className="font-serif font-light text-[28px] text-ink">
            Obra de <em className="italic text-dorado">arte</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
          {/* ── Columna izquierda: imagen ── */}
          <div className="flex flex-col gap-4 shadow-2xl">
            <div className="w-full aspect-3/4 border border-rule overflow-hidden bg-paper flex items-center justify-center">
              {artwork.imageUrl ? (
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-full object-cover "
                />
              ) : (
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-low text-center px-4">
                  Sin imagen
                </p>
              )}
            </div>

          </div>

          {/* ── Columna derecha: info ── */}
          <div className="flex flex-col gap-6">
            <DisplayField label="Título" value={artwork.title} />
            <DisplayField label="Artista" value={artwork.artist} />

            <div className="grid grid-cols-2 gap-6">
              <DisplayField label="Año" value={artwork.year} />
              <DisplayField label="Técnica" value={artwork.technique} />
            </div>

            {artwork.room && (
              <DisplayField label="Sala" value={artwork.room.name} />
            )}

            <DisplayTextarea label="Descripción" value={artwork.description} />

            <DisplayTextarea
              label="Narración (TTS)"
              value={artwork.narration}
              hint="Este texto se utiliza para accesibilidad auditiva."
            />
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Componentes visuales reutilizables ── */

function DisplayField({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
        {label}
      </label>
      <div className="input-line text-[13px] py-1">
        {value || <span className="text-ink-low">—</span>}
      </div>
    </div>
  );
}

function DisplayTextarea({
  label,
  value,
  hint,
}: {
  label: string;
  value?: string | null;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
        {label}
      </label>
      <div className="input-line pt-2 pb-3 text-[13px] leading-relaxed whitespace-pre-line">
        {value || <span className="text-ink-low">—</span>}
      </div>
      {hint && (
        <p className="font-sans text-[10px] text-ink-low mt-1.5">{hint}</p>
      )}
    </div>
  );
}

"use client";

// src/components/admin/TourForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GripVertical, X, Plus } from "lucide-react";
import { createTour, updateTour } from "@/actions/tour.actions";

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  imageUrl: string | null;
};

type Tour = {
  id: number;
  name: string;
  description: string | null;
  language: string;
  duration: number | null;
  isActive: boolean;
  artworks: Artwork[];
};

interface Props {
  museumId: number;
  artworks: Artwork[];
  tour?: Tour;
}

const LANGUAGES = [
  { value: "ES", label: "Español" },
  { value: "EN", label: "English" },
  { value: "PT", label: "Português" },
  { value: "FR", label: "Français" },
];

export default function TourForm({ museumId, artworks = [], tour }: Props) {
  const router = useRouter();
  const isEdit = !!tour;

  const [selected, setSelected] = useState<Artwork[]>(tour?.artworks ?? []);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const available = artworks.filter((a) => !selected.some((s) => s.id === a.id));

  function addArtwork(artwork: Artwork) {
    setSelected((prev) => [...prev, artwork]);
  }

  function removeArtwork(id: number) {
    setSelected((prev) => prev.filter((a) => a.id !== id));
  }

  function onDragStart(i: number) { setDragIndex(i); }

  function onDragOver(e: React.DragEvent, i: number) {
    e.preventDefault();
    if (dragIndex === null || dragIndex === i) return;
    setSelected((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(i, 0, moved);
      setDragIndex(i);
      return next;
    });
  }

  function onDragEnd() { setDragIndex(null); }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    formData.set("museumId", String(museumId));
    formData.set("artworkIds", JSON.stringify(selected.map((a) => a.id)));

    const result = isEdit
      ? await updateTour(tour.id, formData)
      : await createTour(formData);

    if (result.error) {
      setStatus("error");
      setErrorMsg(result.error);
      return;
    }

    router.push("/admin/tours");
  }

  return (
    <div>
      <div className="flex items-baseline gap-4 mb-10 border-b border-rule pb-6">
        <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">
          {isEdit ? "Editar" : "Nuevo"}
        </span>
        <h2 className="font-serif font-light text-[28px] text-ink">
          Visita <em className="italic text-dorado">guiada</em>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Columna izquierda */}
          <div className="flex flex-col gap-6">
            <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low">
              Información general
            </p>

            <div>
              <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
                Nombre del tour
              </label>
              <input name="name" type="text" defaultValue={tour?.name} required className="input-line" />
            </div>

            <div>
              <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
                Descripción
              </label>
              <textarea
                name="description"
                defaultValue={tour?.description ?? ""}
                rows={3}
                className="input-line resize-none pt-2 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
                  Idioma
                </label>
                <select name="language" defaultValue={tour?.language ?? "ES"} required className="input-line cursor-pointer">
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
                  Duración (min)
                </label>
                <input name="duration" type="number" min="1" defaultValue={tour?.duration ?? ""} placeholder="60" className="input-line" />
              </div>
            </div>

            {isEdit && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox" id="isActive" name="isActive" value="true"
                  defaultChecked={tour.isActive}
                  className="appearance-none w-4 h-4 border border-rule bg-transparent cursor-pointer checked:bg-ink checked:border-ink relative transition-colors checked:after:content-[''] checked:after:absolute checked:after:left-[4px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[8px] checked:after:border-cream checked:after:border-r-[1.5px] checked:after:border-b-[1.5px] checked:after:rotate-45"
                />
                <label htmlFor="isActive" className="font-sans text-[13px] text-ink-mid cursor-pointer">
                  Tour activo (visible en la landing)
                </label>
              </div>
            )}

            {status === "error" && (
              <p className="font-sans text-[12px] text-red-600">{errorMsg}</p>
            )}

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit" disabled={status === "loading"}
                className="px-10 py-4 bg-ink text-cream font-sans text-[11px] tracking-[0.22em] uppercase hover:bg-dorado hover:-translate-y-px disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
              >
                {status === "loading" ? "Guardando..." : isEdit ? "Confirmar cambios" : "Crear tour"}
              </button>
              <button
                type="button" onClick={() => router.back()}
                className="font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid border-b border-rule pb-0.5 hover:text-dorado hover:border-dorado transition-all duration-200 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>

          {/* Columna derecha: obras */}
          <div>
            <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-4">
              Obras del tour <span className="text-dorado">({selected.length})</span>
            </p>

            <div className="flex flex-col gap-0.5 mb-6 min-h-[60px]">
              {selected.length === 0 ? (
                <div className="border border-dashed border-rule py-8 flex items-center justify-center">
                  <p className="font-sans text-[12px] text-ink-low">Agregá obras desde la lista de abajo</p>
                </div>
              ) : (
                selected.map((artwork, i) => (
                  <div
                    key={artwork.id} draggable
                    onDragStart={() => onDragStart(i)}
                    onDragOver={(e) => onDragOver(e, i)}
                    onDragEnd={onDragEnd}
                    className={`flex items-center gap-3 px-4 py-3 border border-rule bg-cream cursor-grab active:cursor-grabbing transition-opacity duration-150 ${dragIndex === i ? "opacity-50" : ""}`}
                  >
                    <GripVertical size={14} className="stroke-ink-low flex-shrink-0" />
                    <span className="font-serif text-[13px] text-dorado w-5 flex-shrink-0">{i + 1}</span>
                    <div className="w-8 h-10 flex-shrink-0 border border-rule overflow-hidden bg-paper">
                      {artwork.imageUrl
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-paper" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[13px] text-ink line-clamp-1">{artwork.title}</p>
                      {artwork.artist && <p className="font-sans text-[11px] text-ink-low">{artwork.artist}</p>}
                    </div>
                    <button type="button" onClick={() => removeArtwork(artwork.id)} className="flex-shrink-0 p-1 text-ink-low hover:text-red-500 transition-colors cursor-pointer">
                      <X size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {available.length > 0 && (
              <div>
                <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-ink-low mb-3">Obras disponibles</p>
                <div className="flex flex-col gap-0.5 max-h-[320px] overflow-y-auto">
                  {available.map((artwork) => (
                    <button
                      key={artwork.id} type="button" onClick={() => addArtwork(artwork)}
                      className="flex items-center gap-3 px-4 py-3 border border-rule bg-paper hover:bg-cream hover:border-dorado/50 text-left transition-colors duration-150 cursor-pointer group"
                    >
                      <div className="w-8 h-10 flex-shrink-0 border border-rule overflow-hidden bg-cream">
                        {artwork.imageUrl
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-full object-cover" />
                          : <div className="w-full h-full bg-cream" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-[13px] text-ink line-clamp-1">{artwork.title}</p>
                        {artwork.artist && <p className="font-sans text-[11px] text-ink-low">{artwork.artist}</p>}
                      </div>
                      <Plus size={14} className="stroke-ink-low group-hover:stroke-dorado transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
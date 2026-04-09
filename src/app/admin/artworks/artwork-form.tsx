"use client";

// src/components/admin/ArtworkForm.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArtwork, updateArtwork } from "@/actions/artwork.actions";

type Room = { id: number; name: string };

type Artwork = {
  id: number;
  title: string;
  artist: string | null;
  year: string | null;
  technique: string | null;
  description: string;
  narration: string;
  imageUrl: string | null;
  roomId: number;
};

interface Props {
  rooms: Room[];
  artwork?: Artwork; // si viene → modo edición
}

export default function ArtworkForm({ rooms, artwork }: Props) {
  const router = useRouter();
  const isEdit = !!artwork;

  const [imagePreview, setImagePreview] = useState(artwork?.imageUrl ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const result = isEdit
      ? await updateArtwork(artwork.id, formData)
      : await createArtwork(formData);

    if (result.error) {
      setStatus("error");
      setErrorMsg(result.error);
    } else {
      setStatus("success");
      router.push("/admin/artworks");
    }
  }

  return (
    <div>
      {/* Subheader */}
      <div className="flex items-baseline gap-4 mb-10 border-b border-rule pb-6">
        <span className="font-serif text-[13px] tracking-[0.1em] text-dorado">
          {isEdit ? "Editar" : "Nueva"}
        </span>
        <h2 className="font-serif font-light text-[28px] text-ink">
          Obra de <em className="italic text-dorado">arte</em>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

          {/* ── Columna izquierda: imagen ── */}
          <div className="flex flex-col gap-4">
            {/* Preview */}
            <div className="w-full aspect-[3/4] border border-rule overflow-hidden bg-paper flex items-center justify-center">
              {imagePreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-low text-center px-4">
                  Vista previa de imagen
                </p>
              )}
            </div>

            {/* URL de imagen */}
            <div>
              <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
                URL de imagen
              </label>
              <input
                name="imageUrl"
                type="url"
                defaultValue={artwork?.imageUrl ?? ""}
                placeholder="https://..."
                onChange={(e) => setImagePreview(e.target.value)}
                className="input-line text-[13px]"
              />
            </div>

            {/* Sala */}
            <div>
              <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
                Sala
              </label>
              <select
                name="roomId"
                defaultValue={artwork?.roomId ?? ""}
                required
                className="input-line cursor-pointer"
              >
                <option value="" disabled>Seleccionar sala</option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Columna derecha: campos ── */}
          <div className="flex flex-col gap-6">

            <Field label="Título" name="title" defaultValue={artwork?.title} required />
            <Field label="Artista" name="artist" defaultValue={artwork?.artist ?? ""} />

            <div className="grid grid-cols-2 gap-6">
              <Field label="Año" name="year" defaultValue={artwork?.year ?? ""} />
              <Field label="Técnica" name="technique" defaultValue={artwork?.technique ?? ""} />
            </div>

            <TextareaField
              label="Descripción"
              name="description"
              defaultValue={artwork?.description}
              rows={3}
              required
            />

            <TextareaField
              label="Narración (TTS)"
              name="narration"
              defaultValue={artwork?.narration}
              rows={5}
              hint="Este texto se leerá en voz alta al visitante con deterioro visual."
              required
            />

            {/* Error */}
            {status === "error" && (
              <p className="font-sans text-[12px] text-red-600">{errorMsg}</p>
            )}

            {/* Acciones */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="
                  black-button
                "
              >
                {status === "loading"
                  ? "Guardando..."
                  : isEdit ? "Confirmar cambios" : "Crear obra"}
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="
                  font-sans text-[11px] tracking-[0.2em] uppercase text-ink-mid
                  border-b border-rule pb-0.5
                  hover:text-dorado hover:border-dorado
                  transition-all duration-200 cursor-pointer
                "
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ── Subcomponentes de campo ── */

function Field({
  label, name, defaultValue = "", required = false, type = "text",
}: {
  label: string; name: string; defaultValue?: string;
  required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        className="input-line"
      />
    </div>
  );
}

function TextareaField({
  label, name, defaultValue = "", rows = 3, hint, required = false,
}: {
  label: string; name: string; defaultValue?: string;
  rows?: number; hint?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        required={required}
        className="
          input-line resize-none
          border-b border-rule focus:border-dorado
          pt-2 leading-relaxed
        "
      />
      {hint && (
        <p className="font-sans text-[10px] text-ink-low mt-1.5">{hint}</p>
      )}
    </div>
  );
}
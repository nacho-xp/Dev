"use client";

// src/components/appointments/AppointmentForm.tsx
import { useRef, useState } from "react";
import { createAppointment } from "@/actions/appointment.actions";

export default function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const result = await createAppointment(formData);

    if (result.error) {
      setStatus("error");
      setErrorMsg(result.error);
    } else {
      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-7">

      {/* Nombre y apellido */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2.5">
            Nombre
          </label>
          <input
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            required
            className="input-line"
          />
        </div>
        <div>
          <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2.5">
            Apellido
          </label>
          <input
            name="apellido"
            type="text"
            placeholder="Tu apellido"
            required
            className="input-line"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2.5">
          Correo electrónico
        </label>
        <input
          name="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          required
          className="input-line"
        />
      </div>

      {/* Tour y fecha */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div>
          <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2.5">
            Visita guiada
          </label>
          <select name="tourId" required className="input-line cursor-pointer">
            <option value="" disabled>Seleccionar</option>
            <option value="1">Recorrido Principal (ES)</option>
            <option value="2">Main Tour (EN)</option>
            <option value="3">Recorrido Inclusivo (ES)</option>
          </select>
        </div>
        <div>
          <label className="block font-sans text-[9px] tracking-[0.28em] uppercase text-ink-low mb-2.5">
            Fecha
          </label>
          <input
            name="date"
            type="date"
            required
            className="input-line"
          />
        </div>
      </div>

      {/* Checkbox accesibilidad */}
      <div className="flex items-start gap-3.5">
        <input
          type="checkbox"
          id="accesibilidad"
          name="accesibilidad"
          className="
            appearance-none w-4 h-4 mt-0.5 flex-shrink-0
            border border-rule bg-transparent cursor-pointer
            checked:bg-ink checked:border-ink
            relative transition-colors duration-200
            checked:after:content-[''] checked:after:absolute
            checked:after:left-[4px] checked:after:top-[2px]
            checked:after:w-[5px] checked:after:h-[8px]
            checked:after:border-cream checked:after:border-r-[1.5px] checked:after:border-b-[1.5px]
            checked:after:rotate-45
          "
        />
        <label
          htmlFor="accesibilidad"
          className="font-sans text-[13px] leading-[1.6] text-ink-mid cursor-pointer"
        >
          Requiero accesibilidad para personas con{" "}
          <span className="text-dorado">deterioro visual</span>.
          Se habilitará la guía de audio y los puntos inteligentes.
        </label>
      </div>

      {/* Feedback de error */}
      {status === "error" && (
        <p className="font-sans text-[12px] text-red-600">{errorMsg}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="
          w-full py-[18px]
          font-sans text-[11px] tracking-[0.25em] uppercase
          transition-all duration-200
          disabled:cursor-not-allowed
          cursor-pointer
          bg-ink text-cream hover:bg-dorado hover:-translate-y-px
          disabled:bg-dorado disabled:translate-y-0
        "
      >
        {status === "loading" && "Enviando..."}
        {status === "success" && "Reserva confirmada ✓"}
        {(status === "idle" || status === "error") && "Confirmar reserva"}
      </button>

    </form>
  );
}
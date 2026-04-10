/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// src/app/aplicacion/page.tsx
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
// ── Tipos ───────────────────────────────────────────────────────────────────
type ScanState = "idle" | "scanning" | "found" | "error";

type DetectedDevice = {
  name: string;
  id: string;
};

// ── Constantes ───────────────────────────────────────────────────────────────
const TARGET_NAME = "BEEPCON-01";
const REDIRECT_DELAY = 2500;

// ── Componente ───────────────────────────────────────────────────────────────
export default function AplicacionPage() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [device, setDevice] = useState<DetectedDevice | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [bleSupported, setBleSupported] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined" && !("bluetooth" in navigator)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBleSupported(false);
    }
  }, []);

  // Barra de progreso + redirección
  const animateRedirect = useCallback((artworkId?: string) => {
    const start = performance.now();
    const duration = REDIRECT_DELAY;

    const step = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      const secs = Math.ceil((duration - elapsed) / 1000);
      setProgress(pct);
      setCountdown(secs);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        // Redirige a la obra si tenemos ID, si no a la lista
        window.location.href = `/artwork/1`;
      }
    };
    requestAnimationFrame(step);
  }, []);

  // Escaneo BLE
  const startScan = useCallback(async () => {
    setScanState("scanning");
    setDevice(null);
    setErrorMsg("");
    setProgress(0);

    try {
      const ble = await (navigator as any).bluetooth.requestDevice({
        filters: [{ name: TARGET_NAME }],
        optionalServices: ["12345678-1234-1234-1234-123456789001"],
      });

      setScanState("found");
      setDevice({ name: ble.name ?? TARGET_NAME, id: ble.id ?? "" });

      // Intentar leer el characteristic con el ID de la obra
      let artworkId: string | undefined;
      try {
        const server = await ble.gatt.connect();
        const service = await server.getPrimaryService(
          "12345678-1234-1234-1234-123456789001",
        );
        const char = await service.getCharacteristic(
          "abcdefab-1234-1234-1234-abcdefab0001",
        );
        const value = await char.readValue();
        const identifier = new TextDecoder().decode(value);

        // Consultar la API para obtener el ID de la obra
        const res = await fetch("/api/beepcons/identify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bleIdentifier: identifier }),
        });
        const data = await res.json();
        if (data.artwork?.id) artworkId = String(data.artwork.id);
      } catch {
        // Si falla la lectura igual redirige a artworks
      }

      animateRedirect(artworkId);
    } catch (err: any) {
      setScanState("error");
      if (err.name === "NotFoundError") {
        setErrorMsg("No se seleccionó ningún dispositivo.");
      } else if (err.name === "NotAllowedError") {
        setErrorMsg("Permiso de Bluetooth denegado.");
      } else if (err.name === "SecurityError") {
        setErrorMsg("Requiere HTTPS o localhost.");
      } else {
        setErrorMsg(err.message ?? "Error desconocido.");
      }
    }
  }, [animateRedirect]);

  const isScanning = scanState === "scanning";
  const isFound = scanState === "found";
  const isError = scanState === "error";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream pt-[72px] flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Icono BLE */}
          <div className="flex justify-center mb-10">
            <div
              className={`
              relative w-20 h-20 flex items-center justify-center
              border transition-all duration-500
              ${isScanning ? "border-dorado/60 bg-dorado/5 animate-pulse" : ""}
              ${isFound ? "border-green-400/50 bg-green-50/40" : ""}
              ${isError ? "border-red-400/40 bg-red-50/30" : ""}
              ${!isScanning && !isFound && !isError ? "border-rule bg-paper" : ""}
            `}
            >
              <BleIcon state={scanState} />

              {/* Anillo de pulso */}
              {isScanning && (
                <span className="absolute inset-0 border border-dorado/30 animate-ping" />
              )}
            </div>
          </div>

          {/* Textos */}
          <div className="text-center mb-10">
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-dorado mb-3">
              Experiencia interactiva
            </p>
            <h1 className="font-serif font-light text-[clamp(28px,5vw,42px)] leading-[1.1] text-ink mb-3">
              Escáner de <em className="italic text-dorado">obra</em>
            </h1>
            <p className="font-sans text-[13px] leading-[1.75] text-ink-mid">
              Acercate a una obra de arte y presioná el botón para conectarte al
              punto inteligente.
            </p>
          </div>

          {/* Botón principal */}
          {!isFound && (
            <button
              onClick={startScan}
              disabled={!bleSupported || isScanning}
              className={`
                w-full flex items-center justify-center gap-2.5
                px-8 py-4
                font-sans text-[11px] tracking-[0.22em] uppercase
                transition-all duration-200 cursor-pointer
                disabled:opacity-40 disabled:cursor-not-allowed
                ${
                  isScanning
                    ? "bg-dorado/10 text-dorado border border-dorado/30"
                    : "bg-ink text-cream hover:bg-dorado hover:-translate-y-px"
                }
              `}
            >
              {isScanning ? (
                <>
                  <SpinnerIcon />
                  Buscando...
                </>
              ) : (
                <>
                  <SearchIcon />
                  {isError ? "Reintentar" : "Escanear dispositivo"}
                </>
              )}
            </button>
          )}

          {/* Mensaje de estado */}
          {isError && (
            <div className="mt-4 border-l-2 border-red-400 pl-4 py-1">
              <p className="font-sans text-[12px] text-red-600">{errorMsg}</p>
            </div>
          )}

          {/* Card dispositivo encontrado */}
          {isFound && device && (
            <div className="border border-green-300/40 bg-green-50/30 p-5 mb-4">
              <p className="font-sans text-[9px] tracking-[0.24em] uppercase text-green-600 mb-3 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" />
                Dispositivo detectado
              </p>
              <p className="font-serif font-light text-[20px] text-ink leading-none mb-1">
                {device.name}
              </p>
              <p className="font-sans text-[11px] text-ink-low font-mono">
                {device.id || "ID no disponible"}
              </p>
            </div>
          )}

          {/* Barra de progreso de redirección */}
          {isFound && (
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-ink-low">
                  Cargando obra...
                </p>
                <p className="font-sans text-[10px] text-dorado">
                  {countdown}s
                </p>
              </div>
              <div className="h-px bg-rule overflow-hidden">
                <div
                  className="h-full bg-dorado transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Badge compatibilidad */}
          <div className="mt-10 flex justify-center">
            <div
              className={`
              flex items-center gap-2
              font-sans text-[10px] tracking-[0.12em] uppercase
              border px-4 py-2
              ${
                bleSupported
                  ? "border-rule text-ink-low"
                  : "border-red-200 text-red-500"
              }
            `}
            >
              <span
                className={`
                inline-block w-1.5 h-1.5 rounded-full
                ${bleSupported ? "bg-green-400" : "bg-red-400"}
              `}
              />
              {bleSupported
                ? "Navegador compatible"
                : "Web Bluetooth no soportado"}
            </div>
          </div>

          {!bleSupported && (
            <p className="font-sans text-[12px] text-ink-low text-center mt-3">
              Usá Chrome o Edge en Android para acceder a esta función.
            </p>
          )}

          {/* Link volver */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="font-sans text-[10px] tracking-[0.2em] uppercase text-ink-low border-b border-rule pb-0.5 hover:text-dorado hover:border-dorado transition-colors duration-200"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

// ── Íconos ───────────────────────────────────────────────────────────────────

function BleIcon({ state }: { state: ScanState }) {
  const color =
    state === "found"
      ? "#4ade80"
      : state === "error"
        ? "#f87171"
        : state === "scanning"
          ? "#B08D57"
          : "#8C877E";

  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

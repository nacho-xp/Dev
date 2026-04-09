// src/lib/tts.ts
// Helpers para Web Speech API (Text-to-Speech)
// Solo funciona en el cliente (browser)

export interface TTSOptions {
  lang?: string       // 'es-AR', 'es-ES', 'en-US', etc.
  rate?: number       // velocidad: 0.5 (lento) a 2 (rápido). Default: 0.9
  pitch?: number      // tono: 0 a 2. Default: 1
  volume?: number     // volumen: 0 a 1. Default: 1
}

// Verifica si el browser soporta TTS
export function isTTSSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

// Lee un texto en voz alta
export function speak(text: string, options: TTSOptions = {}): SpeechSynthesisUtterance | null {
  if (!isTTSSupported()) return null

  // Cancelar cualquier lectura en curso
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = options.lang ?? 'es-AR'
  utterance.rate = options.rate ?? 0.9
  utterance.pitch = options.pitch ?? 1
  utterance.volume = options.volume ?? 1

  window.speechSynthesis.speak(utterance)
  return utterance
}

// Detiene la lectura
export function stopSpeaking(): void {
  if (isTTSSupported()) window.speechSynthesis.cancel()
}

// Pausa la lectura
export function pauseSpeaking(): void {
  if (isTTSSupported()) window.speechSynthesis.pause()
}

// Reanuda la lectura
export function resumeSpeaking(): void {
  if (isTTSSupported()) window.speechSynthesis.resume()
}

// Retorna si hay algo siendo leído
export function isSpeaking(): boolean {
  return isTTSSupported() && window.speechSynthesis.speaking
}

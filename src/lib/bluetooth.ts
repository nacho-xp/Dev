// src/lib/bluetooth.ts
// Helpers para Web Bluetooth API
// Solo funciona en Chrome/Edge con HTTPS o localhost
// El usuario debe interactuar (click) antes de llamar a connectBeepcon

export interface BeepconConnection {
  bleIdentifier: string
  artworkId: string
  device: BluetoothDevice
}

// Verifica si el browser soporta Web Bluetooth
export function isBluetoothSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    'bluetooth' in navigator
  )
}

// Conecta a un beepcon via BLE y lee el artworkId
// serviceUUID y characteristicUUID deben coincidir con los del ESP32
export async function connectBeepcon(
  serviceUUID: string,
  characteristicUUID: string
): Promise<BeepconConnection> {
  if (!isBluetoothSupported()) {
    throw new Error('Web Bluetooth no está soportado en este navegador. Usá Chrome o Edge.')
  }

  // Pide al usuario que seleccione el dispositivo BLE
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ namePrefix: 'BEEPCON' }],
    optionalServices: [serviceUUID],
  })

  if (!device.gatt) throw new Error('El dispositivo no tiene GATT server')

  const server = await device.gatt.connect()
  const service = await server.getPrimaryService(serviceUUID)
  const characteristic = await service.getCharacteristic(characteristicUUID)
  const value = await characteristic.readValue()

  // El ESP32 guarda el artworkId como string UTF-8
  const artworkId = new TextDecoder().decode(value)

  return {
    bleIdentifier: device.name ?? 'BEEPCON-UNKNOWN',
    artworkId,
    device,
  }
}

// Llama a la API para obtener la obra asociada al bleIdentifier
export async function fetchArtworkByBeepcon(bleIdentifier: string) {
  const res = await fetch('/api/beepcons/identify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bleIdentifier }),
  })

  if (!res.ok) throw new Error('No se encontró la obra para este beepcon')

  return res.json() // { beepcon, artwork }
}

// Flujo completo: conectar BLE → identificar → obtener obra
export async function scanAndIdentify(serviceUUID: string, characteristicUUID: string) {
  const connection = await connectBeepcon(serviceUUID, characteristicUUID)
  const data = await fetchArtworkByBeepcon(connection.bleIdentifier)
  return { ...data, device: connection.device }
}

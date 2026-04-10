'use server'

// src/actions/beepcon.actions.ts
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
// Lo llama el botón de alerta del visitante con deterioro visual
export async function sendAlert(formData: FormData) {
  const userId = Number(formData.get('userId'))
  const beepconId = Number(formData.get('beepconId'))
  const position = formData.get('position') as string
  const message = formData.get('message') as string | null

  if (!userId || !beepconId || !position) {
    return { error: 'userId, beepconId y position son obligatorios' }
  }

  try {
    const alert = await prisma.alert.create({
      data: { userId, beepconId, position, message },
    })
    revalidatePath('/admin/dashboard') // El admin ve alertas en tiempo real
    return { data: alert }
  } catch {
    return { error: 'Error al enviar la alerta' }
  }
}

// Lo llama el panel admin para simular una señal de ESP32
export async function simulateBeepcon(beepconId: number, triggeredBy?: string) {
  try {
    const beepcon = await prisma.beepcon.findUnique({
      where: { id: beepconId },
      include: {
        artwork: { include: { room: true } },
      },
    })

    if (!beepcon) return { error: 'Beepcon no encontrado' }
    if (!beepcon.isActive) return { error: 'Beepcon inactivo' }

    await prisma.simulatedEvent.create({
      data: { beepconId, triggeredBy: triggeredBy ?? 'Admin' },
    })

    revalidatePath('/admin/beepcons/simulate')
    return { data: { beepcon, artwork: beepcon.artwork } }
  } catch {
    return { error: 'Error al simular el beepcon' }
  }
}

// Lo llama el formulario admin de creación de beepcons
export async function createBeepcon(formData: FormData) {
  const roomId = Number(formData.get('roomId'))
  const artworkId = Number(formData.get('artworkId'))
  const bleIdentifier = formData.get('bleIdentifier') as string
  const serviceUUID = formData.get('serviceUUID') as string
  const characteristicUUID = formData.get('characteristicUUID') as string

  if (!roomId || !artworkId || !bleIdentifier || !serviceUUID || !characteristicUUID) {
    return { error: 'Todos los campos son obligatorios' }
  }

  try {
    const beepcon = await prisma.beepcon.create({
      data: { roomId, artworkId, bleIdentifier, serviceUUID, characteristicUUID },
    })
    revalidatePath('/admin/beepcons')
    return { data: beepcon }
  } catch {
    return { error: 'Error al crear beepcon. Verificá que el bleIdentifier sea único.' }
  }
}

export async function toggleBeepcon(id: number, isActive: boolean) {
  try {
    const beepcon = await prisma.beepcon.update({
      where: { id },
      data: { isActive },
    })
    revalidatePath('/admin/beepcons')
    return { data: beepcon }
  } catch {
    return { error: 'Error al actualizar el beepcon' }
  }
}

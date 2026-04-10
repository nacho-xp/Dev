'use server'

// src/actions/beepcon.actions.ts
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export async function simulateBeepcon(beepconId: number, triggeredBy?: string) {
  try {
    const beepcon = await prisma.beepcon.findUnique({
      where: { id: beepconId },
      include: { artwork: { include: { room: true } } },
    })
    if (!beepcon) return { error: 'Beepcon no encontrado' }
    if (!beepcon.isActive) return { error: 'Beepcon inactivo' }
    return { data: { beepcon, artwork: beepcon.artwork } }
  } catch {
    return { error: 'Error al simular el beepcon' }
  }
}

export async function createBeepcon(formData: FormData) {
  const roomId             = Number(formData.get('roomId'))
  const artworkId          = Number(formData.get('artworkId'))
  const bleIdentifier      = formData.get('bleIdentifier') as string
  const serviceUUID        = formData.get('serviceUUID') as string
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
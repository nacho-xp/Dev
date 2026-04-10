'use server'

// src/actions/tour.actions.ts
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { Language } from '@/generated/prisma/enums'
export async function createTour(formData: FormData) {
  const museumId    = Number(formData.get('museumId'))
  const name        = formData.get('name') as string
  const description = formData.get('description') as string | null
  const language    = formData.get('language') as Language
  const duration    = formData.get('duration') ? Number(formData.get('duration')) : null
  const artworkIds: number[] = JSON.parse((formData.get('artworkIds') as string) || '[]')

  if (!museumId || !name || !language) {
    return { error: 'museumId, name y language son obligatorios' }
  }

  try {
    const tour = await prisma.tour.create({
      data: {
        museumId, name, description, language, duration,
        artworks: artworkIds.length
          ? { connect: artworkIds.map((id) => ({ id })) }
          : undefined,
      },
    })
    revalidatePath('/admin/tours')
    return { data: tour }
  } catch {
    return { error: 'Error al crear el tour' }
  }
}

export async function updateTour(id: number, formData: FormData) {
  const name        = formData.get('name') as string
  const description = formData.get('description') as string | null
  const language    = formData.get('language') as Language
  const duration    = formData.get('duration') ? Number(formData.get('duration')) : null
  const isActive    = formData.get('isActive') === 'true'
  const artworkIds: number[] = JSON.parse((formData.get('artworkIds') as string) || '[]')

  try {
    const tour = await prisma.tour.update({
      where: { id },
      data: {
        name, description, language, duration, isActive,
        artworks: { set: artworkIds.map((artworkId) => ({ id: artworkId })) },
      },
    })
    revalidatePath('/admin/tours')
    revalidatePath(`/admin/tours/${id}/edit`)
    return { data: tour }
  } catch {
    return { error: 'Error al actualizar el tour' }
  }
}

export async function deleteTour(id: number) {
  try {
    await prisma.tour.delete({ where: { id } })
    revalidatePath('/admin/tours')
    return { success: true }
  } catch {
    return { error: 'Error al eliminar el tour' }
  }
}
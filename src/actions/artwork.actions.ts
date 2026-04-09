'use server'

// src/actions/artwork.actions.ts
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

export async function createArtwork(formData: FormData) {
  const roomId = Number(formData.get('roomId'))
  const title = formData.get('title') as string
  const artist = formData.get('artist') as string | null
  const year = formData.get('year') as string | null
  const technique = formData.get('technique') as string | null
  const description = formData.get('description') as string
  const narration = formData.get('narration') as string
  const imageUrl = formData.get('imageUrl') as string | null

  if (!roomId || !title || !description || !narration) {
    return { error: 'roomId, title, description y narration son obligatorios' }
  }

  try {
    const artwork = await prisma.artwork.create({
      data: { roomId, title, artist, year, technique, description, narration, imageUrl },
    })
    revalidatePath('/admin/artworks')
    return { data: artwork }
  } catch {
    return { error: 'Error al crear la obra' }
  }
}

export async function updateArtwork(id: number, formData: FormData) {
  try {
    const artwork = await prisma.artwork.update({
      where: { id },
      data: {
        title: formData.get('title') as string,
        artist: formData.get('artist') as string | null,
        year: formData.get('year') as string | null,
        technique: formData.get('technique') as string | null,
        description: formData.get('description') as string,
        narration: formData.get('narration') as string,
        imageUrl: formData.get('imageUrl') as string | null,
        roomId: Number(formData.get('roomId')),
      },
    })
    revalidatePath('/admin/artworks')
    revalidatePath(`/admin/artworks/${id}/edit`)
    return { data: artwork }
  } catch {
    return { error: 'Error al actualizar la obra' }
  }
}

export async function deleteArtwork(id: number) {
  try {
    await prisma.artwork.delete({ where: { id } })
    revalidatePath('/admin/artworks')
    return { success: true }
  } catch {
    return { error: 'Error al eliminar la obra' }
  }
}

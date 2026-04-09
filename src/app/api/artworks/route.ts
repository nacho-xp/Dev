// src/app/api/artworks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma' 
// GET /api/artworks
// Query params: ?roomId=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const roomId = searchParams.get('roomId')
 
    const artworks = await prisma.artwork.findMany({
      where: roomId ? { roomId: Number(roomId) } : undefined,
      include: {
        room: { select: { id: true, name: true } },
        beepcon: { select: { id: true, bleIdentifier: true, isActive: true } },
      },
      orderBy: { title: 'asc' },
    })
 
    return NextResponse.json(artworks)
  } catch (error) {
    return NextResponse.json({ error: `Error al obtener obras, ${error}` }, { status: 500 })
  }
}
 
// POST /api/artworks
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { roomId, title, artist, year, technique, description, narration, imageUrl } = body
 
    if (!roomId || !title || !description || !narration) {
      return NextResponse.json(
        { error: 'roomId, title, description y narration son obligatorios' },
        { status: 400 }
      )
    }
 
    const artwork = await prisma.artwork.create({
      data: { roomId, title, artist, year, technique, description, narration, imageUrl },
    })
 
    return NextResponse.json(artwork, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Error al crear obra' }, { status: 500 })
  }
}
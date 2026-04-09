// prisma/seed.ts
// Ejecutar con: npx prisma db seed
// Agregar en package.json:
// "prisma": { "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts" }

import prisma from "@/lib/prisma";

async function main() {
  console.log("🌱 Iniciando seed...");

  // 1. MUSEO
  const museum = await prisma.museum.create({
    data: {
      name: "Museo de Arte Moderno Inclusivo",
      description:
        "Un espacio de arte accesible para todos, con tecnología de punta para visitantes con y sin discapacidad.",
      address: "Av. Corrientes 1234, Formosa Capital",
      phone: "+54 11 1234-5678",
      email: "info@museoinc.ar",
      website: "https://museoinc.ar",
    },
  });
  console.log("✅ Museo creado");

  // 2. SALAS
  const sala1 = await prisma.room.create({
    data: { museumId: museum.id, name: "Sala de Arte Contemporáneo", floor: 1 },
  });
  const sala2 = await prisma.room.create({
    data: { museumId: museum.id, name: "Sala de Esculturas", floor: 1 },
  });
  const sala3 = await prisma.room.create({
    data: { museumId: museum.id, name: "Sala Histórica", floor: 2 },
  });
  console.log("✅ Salas creadas");

  // 3. OBRAS DE ARTE
  const obra1 = await prisma.artwork.create({
    data: {
      roomId: sala1.id,
      title: "La persistencia de la memoria",
      artist: "Salvador Dalí",
      year: "1931",
      technique: "Óleo sobre lienzo",
      description:
        "Icónica obra surrealista que representa relojes derritiéndose en un paisaje árido.",
      narration:
        "Ante usted se encuentra La persistencia de la memoria, pintada por Salvador Dalí en 1931. Esta pequeña obra de apenas 24 por 33 centímetros muestra relojes blandos derritiéndose sobre un paisaje costero árido. Dalí la pintó en tan solo dos horas, inspirado por un trozo de queso camembert fundiéndose al sol. La obra representa la relatividad del tiempo en el mundo de los sueños, un concepto central del movimiento surrealista. A su derecha puede percibir una figura distorsionada que representaría al propio artista en estado de sueño.",
    },
  });

  const obra2 = await prisma.artwork.create({
    data: {
      roomId: sala1.id,
      title: "La noche estrellada",
      artist: "Vincent van Gogh",
      year: "1889",
      technique: "Óleo sobre lienzo",
      description:
        "Vista nocturna del pueblo de Saint-Rémy-de-Provence desde el sanatorio donde Van Gogh estaba internado.",
      narration:
        "Frente a usted se encuentra La noche estrellada, una de las obras más reconocidas de Vincent van Gogh, pintada en junio de 1889. El artista la creó desde la ventana de su habitación en el sanatorio de Saint-Paul-de-Mausole, en el sur de Francia. La pintura muestra un cielo nocturno en remolino sobre un pueblo tranquilo, dominado por un ciprés en el primer plano izquierdo. Van Gogh utilizó pinceladas cortas y vigorosas que dan al cielo un movimiento casi tangible. Once estrellas y una luna brillante iluminan la composición. El pueblo que se ve abajo es una combinación de lugares reales e imaginarios, mientras que la iglesia con su campanario recuerda a los edificios de su tierra natal, Holanda.",
    },
  });

  const obra3 = await prisma.artwork.create({
    data: {
      roomId: sala2.id,
      title: "El pensador",
      artist: "Auguste Rodin",
      year: "1904",
      technique: "Bronce",
      description:
        "Escultura en bronce que representa a un hombre en profunda meditación.",
      narration:
        "Ante usted se encuentra El Pensador, una de las esculturas más famosas del mundo, creada por el escultor francés Auguste Rodin. Esta réplica fue fundida en bronce en 1904. La figura representa a un hombre desnudo sentado, inclinado hacia adelante con el codo apoyado sobre la rodilla y el mentón descansando sobre la mano. Originalmente concebida como parte de La Puerta del Infierno, una obra monumental inspirada en la Divina Comedia de Dante, El Pensador representaba al propio Dante contemplando su obra. Rodin eligió representar un hombre musculoso y físico para sugerir que el pensamiento es también un esfuerzo corporal. La escultura original mide aproximadamente 186 centímetros de altura.",
    },
  });
  console.log("✅ Obras creadas");

  // 4. BEEPCONS
  const beepcon1 = await prisma.beepcon.create({
    data: {
      roomId: sala1.id,
      artworkId: obra1.id,
      bleIdentifier: "BEEPCON-01",
      serviceUUID: "12345678-1234-1234-1234-123456789001",
      characteristicUUID: "abcdefab-1234-1234-1234-abcdefab0001",
    },
  });

  const beepcon2 = await prisma.beepcon.create({
    data: {
      roomId: sala1.id,
      artworkId: obra2.id,
      bleIdentifier: "BEEPCON-02",
      serviceUUID: "12345678-1234-1234-1234-123456789002",
      characteristicUUID: "abcdefab-1234-1234-1234-abcdefab0002",
    },
  });

  const beepcon3 = await prisma.beepcon.create({
    data: {
      roomId: sala2.id,
      artworkId: obra3.id,
      bleIdentifier: "BEEPCON-03",
      serviceUUID: "12345678-1234-1234-1234-123456789003",
      characteristicUUID: "abcdefab-1234-1234-1234-abcdefab0003",
    },
  });
  console.log("✅ Beepcons creados");

  // 5. TOURS
  const tourES = await prisma.tour.create({
    data: {
      museumId: museum.id,
      name: "Recorrido Principal",
      description: "Visita a las obras más destacadas del museo.",
      language: "ES",
      duration: 60,
      stops: {
        create: [
          { artworkId: obra1.id, order: 1 },
          { artworkId: obra2.id, order: 2 },
          { artworkId: obra3.id, order: 3 },
        ],
      },
    },
  });

  const tourEN = await prisma.tour.create({
    data: {
      museumId: museum.id,
      name: "Main Tour",
      description: "Visit to the most outstanding works in the museum.",
      language: "EN",
      duration: 60,
      stops: {
        create: [
          { artworkId: obra1.id, order: 1 },
          { artworkId: obra2.id, order: 2 },
        ],
      },
    },
  });
  console.log("✅ Tours creados");

  // 6. USUARIO DE PRUEBA
  const user = await prisma.user.create({
    data: {
      name: "María González",
      email: "maria@test.ar",
      hasVisualImpairment: true,
      preferredLanguage: "ES",
    },
  });
  console.log("✅ Usuario de prueba creado");

  console.log("\n🎉 Seed completado exitosamente");
  console.log(`   Museo ID: ${museum.id}`);
  console.log(`   Obras: ${obra1.id}, ${obra2.id}, ${obra3.id}`);
  console.log(
    `   Beepcons: ${beepcon1.bleIdentifier}, ${beepcon2.bleIdentifier}, ${beepcon3.bleIdentifier}`,
  );
  console.log(`   Tours: ${tourES.id} (ES), ${tourEN.id} (EN)`);
  console.log(`   Usuario: ${user.email}`);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

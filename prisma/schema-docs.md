# Documentación del Schema — Museo Inclusivo

**Proyecto:** Olimpíada Nacional ETP 2022 — Programación  
**ORM:** Prisma  
**Base de datos:** PostgreSQL (Neon)  
**Versión:** 1.0.0

---

## Índice

1. [Diagrama de relaciones](#diagrama-de-relaciones)
2. [Modelos](#modelos)
3. [Enums](#enums)
4. [Relaciones clave](#relaciones-clave)
5. [Notas de implementación](#notas-de-implementación)

---

## Diagrama de relaciones

```
Museum
 ├── Room[]
 │    ├── Artwork[]
 │    │    ├── Beepcon (1:1)
 │    │    │    ├── Alert[]
 │    │    │    └── SimulatedEvent[]
 │    │    └── TourStop[]
 │    └── Beepcon[]
 ├── Tour[]
 │    ├── TourStop[]
 │    └── Appointment[]
 ├── FloorPlan[]
 └── MuseumEvent[]

User
 ├── Appointment[]
 └── Alert[]
```

---

## Modelos

---

### `Museum`

Información general del museo. Es la entidad raíz del sistema.

| Campo       | Tipo     | Descripción                        |
|-------------|----------|------------------------------------|
| id          | Int (PK) | Identificador único                |
| name        | String   | Nombre del museo                   |
| description | String   | Descripción institucional          |
| address     | String   | Dirección física                   |
| phone       | String?  | Teléfono de contacto (opcional)    |
| email       | String?  | Email institucional (opcional)     |
| website     | String?  | Sitio web (opcional)               |
| logoUrl     | String?  | URL del logo (opcional)            |
| createdAt   | DateTime | Fecha de creación (automática)     |
| updatedAt   | DateTime | Última modificación (automática)   |

**Relaciones:** tiene muchas `Room`, `Tour`, `FloorPlan` y `MuseumEvent`.

---

### `Room`

Representa una sala física dentro del museo.

| Campo       | Tipo     | Descripción                          |
|-------------|----------|--------------------------------------|
| id          | Int (PK) | Identificador único                  |
| museumId    | Int (FK) | Museo al que pertenece               |
| name        | String   | Nombre de la sala                    |
| description | String?  | Descripción (opcional)               |
| floor       | Int      | Número de planta (default: 1)        |
| createdAt   | DateTime | Fecha de creación (automática)       |

**Relaciones:** pertenece a un `Museum`, tiene muchas `Artwork` y `Beepcon`.

---

### `Artwork`

Obra de arte expuesta en el museo. Es el núcleo de la experiencia del visitante.

| Campo       | Tipo     | Descripción                                              |
|-------------|----------|----------------------------------------------------------|
| id          | Int (PK) | Identificador único                                      |
| roomId      | Int (FK) | Sala donde se encuentra                                  |
| title       | String   | Título de la obra                                        |
| artist      | String?  | Nombre del artista (opcional)                            |
| year        | String?  | Año de creación (opcional, String para rangos)           |
| technique   | String?  | Técnica utilizada (ej: "Óleo sobre tela")                |
| description | String   | Descripción general                                      |
| narration   | String   | **Texto completo para TTS** (lectura en voz alta)        |
| imageUrl    | String?  | URL de la imagen de la obra                              |
| createdAt   | DateTime | Fecha de creación (automática)                           |
| updatedAt   | DateTime | Última modificación (automática)                         |

> **Nota:** El campo `narration` es el que se envía a la `Web Speech API` cuando el usuario activa la lectura en voz alta. Debe estar redactado en lenguaje descriptivo y accesible.

**Relaciones:** pertenece a una `Room`, tiene un `Beepcon` (1:1) y puede aparecer en múltiples `TourStop`.

---

### `Beepcon`

Representa un punto inteligente físico (ESP32 con BLE). Cada beepcon está asociado a exactamente una obra de arte.

| Campo               | Tipo     | Descripción                                              |
|---------------------|----------|----------------------------------------------------------|
| id                  | Int (PK) | Identificador único interno                              |
| roomId              | Int (FK) | Sala donde está instalado                                |
| artworkId           | Int (FK, unique) | Obra asociada (relación 1:1)                    |
| bleIdentifier       | String (unique) | Nombre BLE del dispositivo (ej: `"BEEPCON-01"`) |
| serviceUUID         | String   | UUID del servicio BLE del ESP32                          |
| characteristicUUID  | String   | UUID del characteristic BLE (contiene el artworkId)     |
| isActive            | Boolean  | Si el beepcon está activo (default: true)                |
| createdAt           | DateTime | Fecha de creación (automática)                           |

> **Flujo BLE:** La app escanea dispositivos con el `bleIdentifier`, se conecta al `serviceUUID`, lee el valor del `characteristicUUID` (que retorna el `artworkId`), y luego consulta la DB para obtener la obra.

**Relaciones:** pertenece a una `Room` y a una `Artwork`, tiene muchas `Alert` y `SimulatedEvent`.

---

### `Tour`

Visita guiada compuesta por una secuencia ordenada de obras de arte.

| Campo       | Tipo     | Descripción                                         |
|-------------|----------|-----------------------------------------------------|
| id          | Int (PK) | Identificador único                                 |
| museumId    | Int (FK) | Museo al que pertenece                              |
| name        | String   | Nombre de la visita (ej: "Recorrido Arte Moderno")  |
| description | String?  | Descripción general (opcional)                      |
| language    | Language | Idioma de la visita (enum)                          |
| duration    | Int?     | Duración estimada en minutos (opcional)             |
| isActive    | Boolean  | Si la visita está disponible (default: true)        |
| createdAt   | DateTime | Fecha de creación (automática)                      |
| updatedAt   | DateTime | Última modificación (automática)                    |

**Relaciones:** pertenece a un `Museum`, tiene muchas `TourStop` y `Appointment`.

---

### `TourStop`

Parada dentro de una visita guiada. Define el orden de las obras en cada tour.

| Campo     | Tipo     | Descripción                          |
|-----------|----------|--------------------------------------|
| id        | Int (PK) | Identificador único                  |
| tourId    | Int (FK) | Visita a la que pertenece            |
| artworkId | Int (FK) | Obra de arte de esta parada          |
| order     | Int      | Orden de la parada dentro del tour   |

**Restricciones únicas:**
- `[tourId, artworkId]` — una obra no puede repetirse en la misma visita.
- `[tourId, order]` — no puede haber dos paradas con el mismo orden en la misma visita.

---

### `User`

Visitante o usuario registrado en el sistema.

| Campo                  | Tipo     | Descripción                                        |
|------------------------|----------|----------------------------------------------------|
| id                     | Int (PK) | Identificador único                                |
| name                   | String   | Nombre completo                                    |
| email                  | String (unique) | Email (usado como identificador de login)   |
| phone                  | String?  | Teléfono (opcional)                                |
| hasVisualImpairment    | Boolean  | Si tiene deterioro visual (activa funciones TTS)   |
| preferredLanguage      | Language | Idioma preferido (default: ES)                     |
| createdAt              | DateTime | Fecha de creación (automática)                     |

**Relaciones:** tiene muchos `Appointment` y `Alert`.

---

### `Appointment`

Turno reservado por un usuario para una visita guiada.

| Campo     | Tipo              | Descripción                              |
|-----------|-------------------|------------------------------------------|
| id        | Int (PK)          | Identificador único                      |
| userId    | Int (FK)          | Usuario que reservó                      |
| tourId    | Int (FK)          | Visita guiada reservada                  |
| date      | DateTime          | Fecha y hora del turno                   |
| status    | AppointmentStatus | Estado del turno (enum)                  |
| notes     | String?           | Notas adicionales (opcional)             |
| createdAt | DateTime          | Fecha de creación (automática)           |

**Restricción única:** `[userId, tourId, date]` — un usuario no puede reservar el mismo tour en el mismo momento dos veces.

---

### `Alert`

Alerta enviada por un usuario indicando su posición física en el edificio. Permite al personal del museo asistirlo.

| Campo      | Tipo     | Descripción                                            |
|------------|----------|--------------------------------------------------------|
| id         | Int (PK) | Identificador único                                    |
| userId     | Int (FK) | Usuario que envió la alerta                            |
| beepconId  | Int (FK) | Beepcon más cercano (indica posición aproximada)       |
| position   | String   | Descripción textual de la posición                     |
| message    | String?  | Mensaje adicional del usuario (opcional)               |
| createdAt  | DateTime | Timestamp de la alerta (automático)                    |

---

### `FloorPlan`

Plano de planta del museo para orientación visual.

| Campo     | Tipo     | Descripción                             |
|-----------|----------|-----------------------------------------|
| id        | Int (PK) | Identificador único                     |
| museumId  | Int (FK) | Museo al que pertenece                  |
| floor     | Int      | Número de planta                        |
| imageUrl  | String   | URL de la imagen del plano              |
| createdAt | DateTime | Fecha de creación (automática)          |

---

### `MuseumEvent`

Eventos temporales o exposiciones especiales del museo.

| Campo       | Tipo     | Descripción                          |
|-------------|----------|--------------------------------------|
| id          | Int (PK) | Identificador único                  |
| museumId    | Int (FK) | Museo al que pertenece               |
| title       | String   | Título del evento                    |
| description | String   | Descripción                          |
| startDate   | DateTime | Fecha de inicio                      |
| endDate     | DateTime | Fecha de fin                         |
| imageUrl    | String?  | Imagen del evento (opcional)         |
| createdAt   | DateTime | Fecha de creación (automática)       |

---

### `SimulatedEvent`

Registro de las veces que un administrador disparó manualmente una señal de beepcon desde el panel web (simula el ESP32 físico durante el desarrollo).

| Campo        | Tipo     | Descripción                                    |
|--------------|----------|------------------------------------------------|
| id           | Int (PK) | Identificador único                            |
| beepconId    | Int (FK) | Beepcon que fue simulado                       |
| triggeredAt  | DateTime | Timestamp del evento (automático)              |
| triggeredBy  | String?  | Nombre del admin que lo disparó (opcional)     |

---

## Enums

### `Language`

Idiomas disponibles para tours y usuarios.

| Valor | Descripción |
|-------|-------------|
| ES    | Español     |
| EN    | Inglés      |
| PT    | Portugués   |
| FR    | Francés     |

---

### `AppointmentStatus`

Estados posibles de un turno reservado.

| Valor     | Descripción                                    |
|-----------|------------------------------------------------|
| PENDING   | Reservado, pendiente de confirmación           |
| CONFIRMED | Confirmado por el museo                        |
| CANCELLED | Cancelado (por el usuario o el museo)          |
| COMPLETED | El visitante asistió y completó la visita      |

---

## Relaciones clave

| Relación               | Tipo | Descripción                                              |
|------------------------|------|----------------------------------------------------------|
| Museum → Room          | 1:N  | Un museo tiene muchas salas                              |
| Room → Artwork         | 1:N  | Una sala tiene muchas obras                              |
| Artwork → Beepcon      | 1:1  | Cada obra tiene un único punto inteligente               |
| Tour → TourStop        | 1:N  | Un tour tiene muchas paradas ordenadas                   |
| Artwork → TourStop     | 1:N  | Una obra puede aparecer en varios tours                  |
| User → Appointment     | 1:N  | Un usuario puede tener múltiples turnos                  |
| Beepcon → Alert        | 1:N  | Un beepcon puede recibir múltiples alertas               |
| Beepcon → SimulatedEvent | 1:N | Un beepcon puede ser simulado múltiples veces          |

---

## Notas de implementación

### Configuración inicial

```bash
# 1. Instalar dependencias
npm install prisma @prisma/client

# 2. Inicializar Prisma (si es proyecto nuevo)
npx prisma init

# 3. Configurar DATABASE_URL en .env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# 4. Crear las tablas en la base de datos
npx prisma migrate dev --name init

# 5. Generar el cliente de Prisma
npx prisma generate
```

### Variable de entorno requerida

```env
# .env
DATABASE_URL="postgresql://..."   # Cadena de conexión de Neon
```

### Seed recomendado

Al iniciar el proyecto se recomienda crear:
- 1 museo de prueba
- 3-5 salas
- Al menos 5 obras con narración completa
- 1 beepcon por obra (con UUIDs de prueba)
- 2 tours (uno en español, uno en inglés)
- 1 usuario con deterioro visual para pruebas

### Campo `narration` en `Artwork`

Este campo es el más importante para la accesibilidad. Debe contener un texto descriptivo completo que la `Web Speech API` leerá en voz alta. Ejemplo:

```
"Ante usted se encuentra 'La persistencia de la memoria', pintada por Salvador Dalí en 1931. 
Esta obra de pequeño formato, apenas 24 por 33 centímetros, muestra relojes blandos derritiéndose 
sobre un paisaje árido. Dalí la pintó en tan solo dos horas, inspirado por un queso camembert 
fundiéndose al sol. Representa la relatividad del tiempo en el mundo de los sueños."
```

### UUIDs para el ESP32

Durante desarrollo se usan UUIDs ficticios. Para el ESP32 físico se recomienda generar UUIDs reales con:

```bash
npx uuid   # o usar uuidgenerator.net
```

El `bleIdentifier` debe coincidir exactamente entre la DB y el código Arduino cargado en el ESP32.

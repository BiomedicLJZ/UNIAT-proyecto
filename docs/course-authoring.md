# Guía completa de authoring de cursos (JSON-first)

Esta base de código ahora renderiza el catálogo y los cursos a partir de JSON validado con Zod. El objetivo es que cualquier curso nuevo se publique **sin hardcodear contenido en componentes**.

## 1) Arquitectura actual

### Fuentes de verdad

- Catálogo de cursos: `src/lib/course-data/catalog.json`
- Esquema principal de curso: `src/lib/course-data/schema.ts` (`CourseSchema`)
- Esquema de simulador docente: `src/lib/course-data/schema.ts` (`SimuladorDocenteSchema`)
- Curso Teoría de la Imagen (JSON): `src/lib/course-data/json/teoria-de-la-imagen.json`
- Curso Simulador Docente (JSON): `src/lib/course-data/json/simulador-docente.json`

### Capa de carga/validación

- `src/lib/course-data/teoria-de-la-imagen.ts`
- `src/lib/course-data/simulador-docente.tsx`

Ambos archivos hacen `parse(...)` del JSON antes de exportar datos al UI.

---

## 2) Estructura obligatoria para cualquier curso académico (CourseSchema)

Campos requeridos:

- `schemaVersion` = `"1.0"`
- `id`, `slug`, `title`, `key`, `period`, `audience`, `description`
- `modules[]` (mínimo uno)
- `references[]` opcional

Tipos de bloque permitidos en `modules[].blocks[]`:

- `markdown`
- `video`
- `image`
- `embed`
- `quote`
- `resource-list`
- `activity`

Tipos de recurso permitidos:

- `pdf`, `video`, `presentation`, `audio`, `img`, `link`

> Recomendación: Cada módulo debe incluir, como mínimo, un bloque de contexto (`markdown`), un recurso audiovisual (`video` o `image`) y un bloque de acción (`activity` o `resource-list`).

---

## 3) Estructura obligatoria para el Simulador Docente

El simulador usa `SimuladorDocenteSchema` con estas secciones:

- `courseInfo`
  - `title`, `version`, `subtitle`, `description`
  - `heroImageUrl`, `heroImageAlt`
  - `introVideo { title, url }`
  - `quickLinks[]`
  - `highlights[]`
- `routes[]`
  - `id`, `title`, `description`, `icon`, `color`, `buttonColor`
  - `scenarios[]`
    - `id`, `discipline`, `title`, `context`, `problem`
    - `resources[]` (videos, imágenes, links, etc.)
    - `options[]` con `score` e `isCorrect`

---

## 4) Flujo recomendado para crear o migrar un curso completo

1. Crea (o duplica) un JSON en `src/lib/course-data/json/`.
2. Ajusta `id` y `slug` en kebab-case.
3. Incluye contenido mínimo por módulo/escenario:
   - texto de contexto,
   - al menos un video,
   - al menos una imagen,
   - al menos un link de apoyo.
4. Registra la entrada en `catalog.json`.
5. Valida con lint/typecheck.
6. Prueba el render en `/` y en la ruta `/courses/<slug>`.

---

## 5) Convenciones de media y enlaces

- Usa URLs públicas y compartibles.
- YouTube: `watch`, `youtu.be` o `shorts` (la app normaliza embed cuando aplica).
- Google Drive/Docs/Slides: usa links reales de archivo/documento.
- Agrega `alt` descriptivo en imágenes cuando el esquema lo requiera.

---

## 6) Checklist de publicación (obligatorio)

Antes de mergear:

- [ ] El JSON parsea sin errores contra su esquema.
- [ ] El catálogo muestra título, descripción e ícono correctos.
- [ ] Cada módulo/escenario tiene recursos completos (video + imagen + link).
- [ ] Los botones externos abren en nueva pestaña.
- [ ] El curso funciona en desktop y mobile.

---

## 7) Comando útil para scaffolding de cursos académicos

```bash
npx tsx scripts/new-course.ts "Nuevo Curso" "ME 202"
```

Este script crea una base JSON validada y actualiza el catálogo automáticamente.

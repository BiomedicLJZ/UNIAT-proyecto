# Proceso completo de authoring (JSON → implementación en la app)

Esta guía documenta el flujo completo para crear, validar e implementar materiales nuevos en la plataforma, empezando por el contenido en JSON y terminando con su publicación dentro de Next.js.

> Objetivo: que cualquier curso nuevo se construya con un flujo repetible, validado y mantenible, evitando hardcodear contenido en componentes.

---

## 1) Qué archivos participan y para qué sirve cada uno

### Fuente de verdad

- `src/lib/course-data/json/*.json`: contenido de cursos basado en JSON (ej. `teoria-de-la-imagen.json`, `simulador-docente.json`).
- `src/lib/course-data/catalog.json`: tarjetas visibles en el home (`/`) y sus rutas.

### Validación de estructura

- `src/lib/course-data/schema.ts`: contratos con Zod para:
  - catálogo (`CatalogSchema`),
  - cursos académicos (`CourseSchema`),
  - simulador (`SimuladorDocenteSchema`).

### Capa de carga hacia UI

- `src/lib/course-data/teoria-de-la-imagen.ts`: exporta datos para el curso académico basado en JSON.
- `src/lib/course-data/simulador-docente.tsx`: parsea y exporta datos del simulador.

### Renderizado

- `src/app/page.tsx`: lee `catalog.json` y renderiza catálogo.
- `src/app/courses/<slug>/page.tsx`: página por curso.
- Componentes de presentación:
  - `src/components/course/teoria-de-la-imagen/*`
  - `src/components/simulador-docente/*`

---

## 2) Antes de escribir JSON: checklist de preparación de materiales

Antes de tocar código, reúne por módulo/escenario:

1. **Objetivo pedagógico** del bloque.
2. **Texto base** (introducción, explicación y cierre).
3. **Recursos**:
   - video,
   - imagen,
   - enlace de lectura/apoyo,
   - opcional: PDF, audio, presentación.
4. **Actividad** (si aplica): consigna, evidencia solicitada y enlace de entrega.
5. **Metadatos del curso**:
   - título,
   - clave,
   - periodo,
   - audiencia,
   - descripción corta para catálogo.

Convenciones recomendadas:

- IDs estables y legibles (`mod-1`, `actividad-1`, etc.).
- `slug` en kebab-case.
- URLs públicas y válidas (Zod exige URL completa).
- `alt` descriptivo para imágenes.

---

## 3) Authoring JSON para cursos académicos (`CourseSchema`)

### 3.1 Estructura mínima obligatoria

Campos requeridos:

- `schemaVersion: "1.0"`
- `id`, `slug`, `title`, `key`, `period`, `audience`, `description`
- `modules` (al menos 1)
- `references` (opcional; por default `[]`)

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

### 3.2 Plantilla sugerida por módulo

Cada módulo debe incluir, idealmente:

1. Bloque de contexto (`markdown`)
2. Bloque audiovisual (`video` o `image`)
3. Bloque accionable (`activity` o `resource-list`)

### 3.3 Flujo de creación rápido

1. Crear archivo nuevo en `src/lib/course-data/json/<slug>.json`.
2. Partir de una estructura validada existente o de `src/lib/course-data/templates/course.template.json`.
3. Completar metadatos y módulos.
4. Guardar y validar con lint/typecheck/build.

---

## 4) Authoring JSON para Simulador Docente (`SimuladorDocenteSchema`)

El JSON debe contener:

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
    - `resources[]`
    - `options[]` con `feedback`, `score` e `isCorrect`

Regla práctica de calidad:

- Cada escenario debería incluir al menos 1 recurso contextual y 2+ opciones con retroalimentación útil.

---

## 5) Implementación en la aplicación (paso a paso)

> Esta sección cubre desde “ya tengo JSON” hasta “se ve y navega en la app”.

### Paso 1: registrar catálogo

Agregar o actualizar entrada en `src/lib/course-data/catalog.json`:

- `id` único,
- `title` y `description` para tarjeta,
- `href` hacia `/courses/<slug>`,
- `icon` válido (`book-open` o `brain-circuit`).

### Paso 2: crear/actualizar loader en `src/lib/course-data`

Para cursos académicos:

- importar el JSON,
- parsearlo con `CourseSchema.parse(...)`,
- exportar datos listos para el componente.

Para simulador:

- importar JSON,
- parsear con `SimuladorDocenteSchema.parse(...)`,
- exportar `courseInfo` y rutas.

### Paso 3: conectar ruta en `src/app/courses/<slug>/page.tsx`

- Crear página del curso si no existe.
- Renderizar componente correspondiente.
- Verificar que la navegación del catálogo (`href`) coincida exactamente con el `slug`.

### Paso 4: adaptar componente visual (si aplica)

Si agregas bloques nuevos o cambias estructura:

- actualizar renderers en componentes de curso,
- validar estados vacíos,
- mantener experiencia mobile/desktop.

### Paso 5: validación integral

- Home muestra tarjeta correcta.
- Ruta abre sin error.
- Módulos/escenarios renderizan sin faltantes.
- Enlaces externos funcionan.

---

## 6) Automatización disponible

Puedes usar el script:

```bash
npx tsx scripts/new-course.ts "Nuevo Curso" "ME 202"
```

Qué hace:

1. Genera `slug` e `id`.
2. Crea un JSON base del curso desde plantilla.
3. Inserta/actualiza entrada en `catalog.json`.

Después del script, revisa manualmente:

- copy académico,
- recursos multimedia,
- consistencia de rutas en `href`.

---

## 7) QA de publicación (obligatorio)

Antes de merge:

- [ ] El JSON valida contra su esquema Zod.
- [ ] `catalog.json` no tiene IDs duplicados ni `href` rotos.
- [ ] El curso abre en `/courses/<slug>`.
- [ ] Todos los bloques/recursos muestran contenido.
- [ ] Enlaces externos abren correctamente.
- [ ] Vista responsive validada (mobile + desktop).

Comandos sugeridos:

```bash
npm run lint
npm run build
```

---

## 8) Errores comunes y cómo resolverlos

1. **Error de Zod por URL inválida**
   - Solución: usar URL absoluta (`https://...`) en `url`, `heroImageUrl`, etc.

2. **Tarjeta de curso no aparece en home**
   - Solución: verificar entrada en `catalog.json` y formato del ícono permitido.

3. **La ruta existe pero no renderiza contenido nuevo**
   - Solución: confirmar que `page.tsx` use el loader correcto y que el loader importe el JSON correcto.

4. **Slug/catalog no coinciden**
   - Solución: alinear `slug`, `href` y carpeta/ruta en `src/app/courses`.

---

## 9) Criterio de “Done” para authoring

Un curso está realmente implementado cuando:

- existe JSON versionado y validado,
- está registrado en catálogo,
- tiene ruta funcional,
- renderiza completo sin hardcode adicional,
- pasó lint/build y revisión visual.

Si no se cumplen todos estos puntos, el curso aún está en estado “borrador técnico”.

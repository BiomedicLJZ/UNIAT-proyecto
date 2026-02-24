# Course authoring guide

This project supports JSON-driven course definitions for consistent validation and scaffolding.

## File locations

- Course template: `src/lib/course-data/templates/course.template.json`
- Course schema: `src/lib/course-data/schema.ts`
- Course catalog: `src/lib/course-data/catalog.json`
- Embed transform utility (single source of truth): `src/lib/course-data/embed-utils.ts`
- Generated courses: `src/lib/course-data/courses/<course-slug>.json`

## Required top-level fields

Every course document must satisfy `CourseSchema`.

| Field | Type | Required | Notes |
|---|---|---:|---|
| `schemaVersion` | string | ✅ | Must be `"1.0"`. |
| `id` | string | ✅ | Stable identifier, use kebab-case. |
| `slug` | string | ✅ | URL-safe slug (`^[a-z0-9]+(?:-[a-z0-9]+)*$`). |
| `title` | string | ✅ | Display title. |
| `key` | string | ✅ | Academic key (e.g. `ME 101`). |
| `period` | string | ✅ | Academic period label. |
| `audience` | string | ✅ | Target audience/program. |
| `description` | string | ✅ | Catalog summary. |
| `coverImageUrl` | URL string | optional | Public image URL. |
| `modules` | array | ✅ | At least one module. |
| `references` | array | optional | Defaults to `[]`. |

### Required module fields

Each module requires:

- `id`
- `title`
- `summary`
- `blocks` (at least one)

## Allowed block types

`blocks` is a discriminated union by `type`.

1. `markdown`: `id`, `body` (+ optional `title`)
2. `video`: `id`, `title`, `url`
3. `image`: `id`, `title`, `url`, `alt`
4. `embed`: `id`, `title`, `url`
5. `quote`: `id`, `quote` (+ optional `author`)
6. `resource-list`: `id`, `title`, `resources[]`
7. `activity`: `id`, `title`, `instruction` (+ optional `submissionUrl`)

Allowed resource types inside `resource-list` and `references`:

- `pdf`
- `video`
- `presentation`
- `audio`
- `img`
- `link`

## Naming conventions

- **Slugs/IDs**: use lowercase kebab-case.
- **Module IDs**: `mod-1`, `mod-2`, etc.
- **Block IDs**: prefix with module ID, e.g. `mod-1-intro`, `mod-1-video`.
- **File name**: exactly `<slug>.json`.
- **Catalog href**: `/courses/<slug>`.

## Media and link conventions

Use public, shareable URLs and let embed conversion happen in `embed-utils.ts`.

- **Google Drive files**: prefer `https://drive.google.com/file/d/<FILE_ID>/view?...`
- **YouTube**: use watch/short/`youtu.be` links (all normalized)
- **Google Docs/Slides**: use `/edit` URLs

The UI calls `getEmbedUrl()` to centralize conversions:

- Drive file URLs → `/preview`
- Docs/Slides `/edit` URLs → `/embed?...`
- YouTube links → `https://www.youtube.com/embed/<id>?autoplay=1&rel=0`

Do not duplicate provider-specific replacement logic in components.

## Scaffolding a new course

Run:

```bash
npx tsx scripts/new-course.ts "Nuevo Curso" "ME 202"
```

This command will:

1. Copy the JSON template.
2. Apply title/slug/key.
3. Validate against `CourseSchema`.
4. Create `src/lib/course-data/courses/<slug>.json`.
5. Register/update the entry in `src/lib/course-data/catalog.json`.

## Minimal example

```json
{
  "schemaVersion": "1.0",
  "id": "pensamiento-visual",
  "slug": "pensamiento-visual",
  "title": "Pensamiento Visual",
  "key": "ME 202",
  "period": "2° Cuatrimestre",
  "audience": "Maestría en Medios Digitales",
  "description": "Fundamentos de análisis y producción visual.",
  "modules": [
    {
      "id": "mod-1",
      "title": "Módulo 1",
      "summary": "Introducción al lenguaje visual.",
      "blocks": [
        {
          "type": "markdown",
          "id": "mod-1-intro",
          "body": "# Bienvenida"
        }
      ]
    }
  ],
  "references": []
}
```

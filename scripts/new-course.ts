import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CatalogSchema, CourseSchema, type CatalogEntry, type CourseDocument } from '../src/lib/course-data/schema';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const templatePath = path.join(repoRoot, 'src/lib/course-data/templates/course.template.json');
const catalogPath = path.join(repoRoot, 'src/lib/course-data/catalog.json');
const outputDir = path.join(repoRoot, 'src/lib/course-data/courses');

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const readJson = async <T>(filePath: string): Promise<T> => {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
};

const run = async () => {
  const [rawTitle, rawKey = 'ME 000'] = process.argv.slice(2);

  if (!rawTitle) {
    console.error('Uso: npx tsx scripts/new-course.ts "Título del curso" "CLAVE"');
    process.exit(1);
  }

  const slug = toSlug(rawTitle);
  const id = slug;

  const template = await readJson<CourseDocument>(templatePath);
  const course: CourseDocument = {
    ...template,
    id,
    slug,
    title: rawTitle,
    key: rawKey,
  };

  CourseSchema.parse(course);

  await mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, `${slug}.json`);
  await writeFile(outputPath, `${JSON.stringify(course, null, 2)}\n`, 'utf8');

  const catalog = CatalogSchema.parse(await readJson<CatalogEntry[]>(catalogPath));
  const entry: CatalogEntry = {
    id,
    title: rawTitle,
    description: course.description,
    href: `/courses/${slug}`,
    icon: 'book-open',
  };

  const nextCatalog = [...catalog.filter((item) => item.id !== id), entry].sort((a, b) =>
    a.title.localeCompare(b.title, 'es'),
  );

  await writeFile(catalogPath, `${JSON.stringify(nextCatalog, null, 2)}\n`, 'utf8');

  console.log(`Curso creado: ${path.relative(repoRoot, outputPath)}`);
  console.log(`Catálogo actualizado: ${path.relative(repoRoot, catalogPath)}`);
};

run();

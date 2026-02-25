import { z } from 'zod';

export const RESOURCE_TYPES = [
  'pdf',
  'video',
  'presentation',
  'audio',
  'img',
  'link',
] as const;

export const BLOCK_TYPES = [
  'markdown',
  'video',
  'image',
  'embed',
  'quote',
  'resource-list',
  'activity',
] as const;

const ResourceSchema = z.object({
  type: z.enum(RESOURCE_TYPES),
  title: z.string().min(1),
  url: z.string().url(),
  context: z.string().optional(),
});

const MarkdownBlockSchema = z.object({
  type: z.literal('markdown'),
  id: z.string().min(1),
  title: z.string().min(1).optional(),
  body: z.string().min(1),
});

const VideoBlockSchema = z.object({
  type: z.literal('video'),
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
});

const ImageBlockSchema = z.object({
  type: z.literal('image'),
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  alt: z.string().min(1),
});

const EmbedBlockSchema = z.object({
  type: z.literal('embed'),
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
});

const QuoteBlockSchema = z.object({
  type: z.literal('quote'),
  id: z.string().min(1),
  quote: z.string().min(1),
  author: z.string().min(1).optional(),
});

const ResourceListBlockSchema = z.object({
  type: z.literal('resource-list'),
  id: z.string().min(1),
  title: z.string().min(1),
  resources: z.array(ResourceSchema).min(1),
});

const ActivityBlockSchema = z.object({
  type: z.literal('activity'),
  id: z.string().min(1),
  title: z.string().min(1),
  instruction: z.string().min(1),
  submissionUrl: z.string().url().optional(),
});

export const CourseBlockSchema = z.discriminatedUnion('type', [
  MarkdownBlockSchema,
  VideoBlockSchema,
  ImageBlockSchema,
  EmbedBlockSchema,
  QuoteBlockSchema,
  ResourceListBlockSchema,
  ActivityBlockSchema,
]);

export const CourseModuleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  blocks: z.array(CourseBlockSchema).min(1),
});

export const CourseSchema = z.object({
  schemaVersion: z.literal('1.0'),
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  key: z.string().min(1),
  period: z.string().min(1),
  audience: z.string().min(1),
  description: z.string().min(1),
  coverImageUrl: z.string().url().optional(),
  modules: z.array(CourseModuleSchema).min(1),
  references: z.array(ResourceSchema).default([]),
});

export const CatalogEntrySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  href: z.string().min(1),
  icon: z.enum(['book-open', 'brain-circuit']),
});

export const CatalogSchema = z.array(CatalogEntrySchema);

const SimulatorOptionSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  feedback: z.string().min(1),
  score: z.object({
    humanismo: z.number().int().nonnegative(),
    innovacion: z.number().int().nonnegative(),
  }),
  isCorrect: z.boolean(),
});

const SimulatorScenarioSchema = z.object({
  id: z.string().min(1),
  discipline: z.string().min(1),
  title: z.string().min(1),
  context: z.string().min(1),
  problem: z.string().min(1),
  resources: z.array(ResourceSchema).default([]),
  options: z.array(SimulatorOptionSchema).min(1),
});

export const SimulatorRouteIconSchema = z.enum([
  'message-square',
  'bar-chart',
  'globe',
  'users',
  'star',
  'zap',
  'shield',
  'heart',
]);

const SimulatorRouteSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  icon: SimulatorRouteIconSchema,
  color: z.string().min(1),
  buttonColor: z.string().min(1),
  scenarios: z.array(SimulatorScenarioSchema),
});

export const SimuladorDocenteSchema = z.object({
  courseInfo: z.object({
    title: z.string().min(1),
    version: z.string().min(1),
    subtitle: z.string().min(1),
    description: z.string().min(1),
    heroImageUrl: z.string().url(),
    heroImageAlt: z.string().min(1),
    introVideo: z.object({
      title: z.string().min(1),
      url: z.string().url(),
    }),
    quickLinks: z.array(z.object({ label: z.string().min(1), url: z.string().url() })).default([]),
    highlights: z.array(z.object({ title: z.string().min(1), description: z.string().min(1) })).default([]),
  }),
  routes: z.array(SimulatorRouteSchema).min(1),
});

export type CourseDocument = z.infer<typeof CourseSchema>;
export type CatalogEntry = z.infer<typeof CatalogEntrySchema>;
export type SimuladorDocenteDocument = z.infer<typeof SimuladorDocenteSchema>;

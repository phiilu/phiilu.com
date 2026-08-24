import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    publishedDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
    published: z.boolean()
  })
});

const gear = defineCollection({
  loader: glob({ base: './src/content/gear', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    affiliateLink: z.string().nullable().optional(),
    affiliateLinkText: z.string().nullable().optional()
  })
});

export const collections = { posts, gear };

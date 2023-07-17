import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    publishedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()),
    published: z.boolean(),
  }),
});

const gear = defineCollection({
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    affiliateLink: z.string().nullable().optional(),
    affilateLinkText: z.string().nullable().optional(),
  }),
});

export const collections = { posts, gear };

import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

const posts = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    // Transform string to Date object
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
  type: "content",
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    affiliateLink: z.string().nullable().optional(),
    affilateLinkText: z.string().nullable().optional(),
  }),
});

export const collections = { blog, posts, gear };

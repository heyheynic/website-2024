// 1. Import utilities from `astro:content`
import { z, defineCollection, reference } from "astro:content";

// 2. Define a `type` and `schema` for each collection

// blog
const postsCollection = defineCollection({
  type: "content", // v2.5.0 and later
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(60, { message: "Title must be 60 character or less" }),
      tags: z.array(z.string()),
      description: z
        .string()
        .max(160, { message: "Description must be 160 character or less" })
        .optional(),
      img: image().optional(),
      pubDate: z.date(),
      // author: reference("team"),
      author: z.string().default('Nicole H'),

      relatedPosts: z.array(reference("posts")).optional(),
    }),
});

// portfolio
const portfolioCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      img: image().optional(),
      altText: z.string().optional(),

    }),
});

// team, (just me atm)
const team = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string(),
      email: z.string().optional(),
      // role: z.enum(["Software", "Design", "Marketing"]),
      role: z.string().optional(),
      img: image(),
    }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
  portfolio: portfolioCollection,
  team: team,
};

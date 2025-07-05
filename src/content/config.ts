import { defineCollection, z } from 'astro:content'

const postCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    dateFormatted: z.string(),
    image: z.string().optional(),
  }),
})

const commissionCollection = defineCollection({
  type: 'data',
  schema: z.object({
    fileName: z.string(),
    Character: z.string(),
    Featured: z.boolean(),
    Twitter: z.string().optional(),
    Pixiv: z.string().optional(),
    Skeb: z.string().optional(),
  }),
})

export const collections = {
  post: postCollection,
  commission: commissionCollection,
}

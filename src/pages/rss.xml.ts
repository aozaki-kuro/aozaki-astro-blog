import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

export async function GET({ site }) {
  const posts = await getCollection('post')
  const items = posts
    .sort(
      (a, b) =>
        parseDate(b.data.dateFormatted).getTime() - parseDate(a.data.dateFormatted).getTime(),
    )
    .map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: parseDate(post.data.dateFormatted),
      link: `/post/${post.slug}/`,
    }))

  return rss({
    title: "Aozaki's blog",
    description: 'Aozaki的个人博客，偶尔写点东西。',
    site,
    items,
  })
}

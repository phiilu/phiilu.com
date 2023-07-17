import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION } from "../consts";

export async function get(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "phiilu.com",
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedDate,
      link: `/${post.slug}/`,
    })),
  });
}

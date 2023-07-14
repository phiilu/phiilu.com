// contentful space export --space-id
import contentful from "./contentful.json" assert { type: "json" };
import fs from "fs/promises";
import slugify from "@sindresorhus/slugify";
import mime from "mime-types";
import fsOld from "fs";
import path from "path";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();

interface Post {
  title: string;
  description: string;
  content?: string;
  slug?: string;
  icon?: string;
  publishedDate?: string;
  tags?: string[];
}

interface Tag {
  id: string;
  title: string;
  description: string;
  slug?: string;
}

interface Gear {
  title: string;
  description: string;
  image?: string;
  category?: string;
  link?: string;
  affilateLink?: string;
  affilateLinkText?: string;
}

interface Asset {
  id: string;
  title: string;
  description?: string;
  filename: string;
  details:
    | {
        size: number;
        image: {
          width: number;
          height: number;
        };
      }
    | {
        size: number;
        image: {
          width: number;
          height: number;
        };
      };
  contentType: string;
  url: string;
  fileNameNew: string;
}

const posts: Post[] = [];
const tags: Tag[] = [];
const gears: Gear[] = [];
const assets: Asset[] = [];

contentful.assets.forEach((asset) => {
  assets.push({
    id: asset.sys.id,
    title: asset.fields.title["en-US"],
    description: asset.fields.description?.["en-US"],
    filename: asset.fields.file["en-US"].fileName,
    details: asset.fields.file["en-US"].details,
    contentType: asset.fields.file["en-US"].contentType,
    url: asset.fields.file["en-US"].url,
    fileNameNew: `${slugify(asset.fields.title["en-US"])}.${mime.extension(
      asset.fields.file["en-US"].contentType,
    )}`,
  });
});

contentful.entries.forEach((entry) => {
  if (entry.sys.contentType.sys.id == "tag") {
    const tag = {
      id: entry.sys.id,
      title: entry.fields.title["en-US"],
      slug: entry.fields.slug?.["en-US"],
      description: entry.fields.description["en-US"],
    };

    tags.push(tag);
  }

  if (entry.sys.contentType.sys.id == "gear") {
    const gear = {
      title: entry.fields.title["en-US"],
      description: entry.fields.description["en-US"],
      image: entry.fields.image?.["en-US"].sys.id,
      category: entry.fields.category?.["en-US"],
      link: entry.fields.link?.["en-US"],
      affilateLink: entry.fields.affiliateLink?.["en-US"],
      affilateLinkText: entry.fields.affiliateLinkText?.["en-US"],
    };

    gears.push(gear);
  }
});

contentful.entries.forEach((entry) => {
  if (entry.sys.contentType.sys.id == "post") {
    const post = {
      title: entry.fields.title["en-US"],
      slug: entry.fields.slug?.["en-US"],
      icon: entry.fields.icon?.["en-US"].sys.id,
      publishedDate: entry.fields.publishedDate?.["en-US"],
      description: entry.fields.description["en-US"],
      tags: entry.fields.tags?.["en-US"].map(
        (tag) => tags.find((t) => t.id === tag.sys.id)?.title || "",
      ),
      content: entry.fields.content?.["en-US"],
    };

    posts.push(post);
  }
});

// create mdx files

if (!fsOld.existsSync("posts")) {
  await fs.mkdir("images/icons", { recursive: true });
  await fs.mkdir("images/posts", { recursive: true });
  await fs.mkdir("posts", { recursive: true });
  createMDXFiles(posts);
}

async function createMDXFiles(posts: Post[]) {
  for (let post of posts) {
    // Construct the filename
    const fileName = `${post.publishedDate}-${post.slug}.mdx`;
    const icon = assets.find((asset) => asset.id === post.icon);

    if (icon) {
      await downloadAsset(icon, path.join("images", "icons"));
    }

    // Construct the frontmatter
    const frontmatter = `---
title: ${post.title}
icon: ${
      icon
        ? `/images/icons/${slugify(icon.title)}.${mime.extension(
            icon.contentType,
          )}`
        : ""
    }
slug: ${post.slug}
publishedDate: ${post.publishedDate}
published: true
description: ${post.description}
tags: ${JSON.stringify(post.tags)}
---`;

    let index = 0;
    const postContent = post.content?.replace(
      /\!\[(.*?)\]\((.*?)\)/gm,
      (match, title, url) => {
        let asset = assets.find((asset) => asset.url === url);

        if (!asset) return match;

        index += 1;

        const fileName = `${post.slug}-${index}.${mime.extension(
          asset.contentType,
        )}`;

        asset.fileNameNew = fileName;
        downloadAsset(asset, path.join("images", "posts"));

        return `![${title}](/images/posts/${fileName})`;
      },
    );

    // Construct the content
    const content = `${frontmatter}\n\n${postContent}`;

    // Write the content to the file
    await fs.writeFile(path.join("posts", fileName), content);
  }
}

async function downloadAsset(asset: Asset, dir = "images") {
  try {
    const response = await fetch(`https:${asset.url}`);
    const arrayBuffer = await response.arrayBuffer();

    await fs.writeFile(`${dir}/${asset.fileNameNew}`, Buffer.from(arrayBuffer));
  } catch (error) {
    console.error(error);
  }
}

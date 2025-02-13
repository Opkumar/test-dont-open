"use server";

import client from "@/lib/sanity";

export async function getInsight(slug: string) {
  return client.fetch(
    `*[_type == "insightCard" && slug.current == $slug][0]{
      title,
      description,
      "imageUrl": image.asset->url,
      disclaimer,
      "attachmentUrl": attachment.asset->url,
      date,
    }`,
    { slug },
  );
}

"use server";

import client from "@/lib/sanity";

export async function getServices() {
  const servicesQuery = `*[_type == "service"]{
  _id,
  name,
  description,
  "banner": banner.asset->url,
  "slug": slug.current
}`;

  const services = await client.fetch(servicesQuery);
  return services;
}

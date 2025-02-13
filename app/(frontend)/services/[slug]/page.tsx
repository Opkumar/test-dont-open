import { notFound } from "next/navigation";
import ServicePage from "@/app/components/ServicePage";
import client from "@/lib/sanity";

export default async function Page({ params }) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);

  const serviceQuery = `*[_type == "service" && slug.current == $slug][0]{
    name,
    "banner": banner.asset->url,
    description,
    content,
    sections,
    keyServices[]{
      title,
      description
    }
  }`;

  const serviceData = await client.fetch(serviceQuery, { slug: decodedSlug });

  // console.log(serviceData);

  if (!serviceData) {
    notFound();
  }

  return <ServicePage service={serviceData} />;
}

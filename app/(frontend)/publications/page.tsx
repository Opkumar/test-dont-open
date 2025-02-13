import client from "@/lib/sanity";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getInsightCards() {
  const query = `*[_type == "insightCard"] | order(date desc) {
    title,
    description,
    image,
    slug,
    date
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function InsightsPage() {
  const insightCards = await getInsightCards();

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-[#1a2942] mb-12">
          Publications
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightCards.map((card: any, index: number) => (
            <Link href={`publications/${card.slug.current}`} key={index}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
                <div className="relative w-full h-48">
                  <Image
                    src={urlFor(card.image).url()}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                  <p className="text-gray-600 mb-4">
                    {card.description.substring(0, 50) + "..."}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(card.date).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

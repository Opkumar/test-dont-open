"use server";

import payload from "payload";
import { format } from "date-fns";

export type Service = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

export type NewsItem = {
  id: string;
  title: string;
  content: any;
  publishedDate: string;
  slug: string;
};

export async function getServices(): Promise<Service[]> {
  try {
    const response = await payload.find({
      collection: "services",
    });
    return response.docs as Service[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getNews(dateRange?: {
  from: string;
  to: string;
}): Promise<NewsItem[]> {
  try {
    const query: any = {
      collection: "news",
      sort: "-publishedDate",
    };

    if (dateRange) {
      query.where = {
        and: [
          {
            publishedDate: {
              greater_than_equal: dateRange.from,
            },
          },
          {
            publishedDate: {
              less_than_equal: dateRange.to,
            },
          },
        ],
      };
    }

    const response = await payload.find(query);
    return response.docs.map((news) => ({
      ...news,
      publishedDate: format(new Date(news.publishedDate), "dd/MM/yyyy"),
    })) as NewsItem[];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

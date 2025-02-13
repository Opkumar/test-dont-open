"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import client from "@/lib/sanity";
import Carousel from "@/components/Carousel";
import Link from "next/link";

interface NewsItem {
  date: string;
  title: string;
  description: string;
}

interface InsightItem {
  date: string;
  title: string;
  slug: { current: string };
  description: string;
  attachment?: {
    asset: {
      url: string;
    };
  };
}

const ServicesSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [insightItems, setInsightItems] = useState<InsightItem[]>([]);
  const [newsDate, setNewsDate] = useState<Date>();
  const [pubDate, setPubDate] = useState<Date>();
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const [isPubHovered, setIsPubHovered] = useState(false);

  useEffect(() => {
    // Fetch "What's New" data
    const fetchNews = async () => {
      const query = `*[_type == "whatsNew"] | order(date desc) {
        date,
        title,
        description
      }`;
      const data = await client.fetch(query);
      setNewsItems(data);
    };

    // Fetch "Publications" data with insight schema
    const fetchInsights = async () => {
      const query = `*[_type == "insightCard"] | order(date desc) {
        date,
        title,
        description,
        "slug": slug.current,
        "attachment": attachment.asset->url
      }`;
      const data = await client.fetch(query);
      setInsightItems(data);
    };

    fetchNews();
    fetchInsights();
  }, []);

  // Filter news items based on date
  const filteredNews = newsItems.filter((item) =>
    newsDate
      ? new Date(item.date).toDateString() === newsDate.toDateString()
      : true,
  );

  // Filter publication items based on date
  const filteredInsights = insightItems.filter((item) =>
    pubDate
      ? new Date(item.date).toDateString() === pubDate.toDateString()
      : true,
  );

  const scrollAnimation = {
    y: [0, -500, 0],
    transition: {
      y: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  };

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 uppercase"
        >
          Our Services
        </motion.h2>
        <div className="">
          <Carousel />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What's New Section */}
          <div className="bg-[#1a2942] p-6 rounded-xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <h3 className="text-lg font-bold text-white">What's New</h3>
              <div className="w-full lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full lg:w-[240px] justify-start hover:bg-gray-100 text-left font-normal bg-white",
                        !newsDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newsDate ? (
                        format(newsDate, "PPP")
                      ) : (
                        <span>Filter by date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-orange-50"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={newsDate}
                      onSelect={setNewsDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded"
              onMouseEnter={() => setIsNewsHovered(true)}
              onMouseLeave={() => setIsNewsHovered(false)}
            >
              <div className="h-[300px] overflow-hidden relative">
                <motion.div
                  animate={isNewsHovered ? { y: 0 } : scrollAnimation}
                  className="space-y-4"
                >
                  {filteredNews.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 pr-4"
                    >
                      <span className="text-sm text-gray-500 whitespace-nowrap min-w-[100px]">
                        {format(new Date(item.date), "dd/MM/yyyy")}
                      </span>
                      <div>
                        <p className="text-blue-600 hover:underline cursor-pointer break-words">
                          {item.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="mt-4 text-right text-white">
              Updated Till : {format(new Date(), "dd/MM/yyyy")}
            </div>
          </div>

          {/* Publications Section */}
          <div className="bg-[#1a2942] p-6 rounded-xl">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
              <h3 className="text-lg font-bold text-white">Publications</h3>
              <div className="w-full lg:w-auto">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full lg:w-[240px] justify-start text-left font-normal hover:bg-gray-100 bg-white",
                        !pubDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pubDate ? (
                        format(pubDate, "PPP")
                      ) : (
                        <span>Filter by date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 bg-orange-50"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={pubDate}
                      onSelect={setPubDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div
              className="bg-white p-4 rounded"
              onMouseEnter={() => setIsPubHovered(true)}
              onMouseLeave={() => setIsPubHovered(false)}
            >
              <div className="h-[300px] overflow-hidden relative">
                <motion.div
                  animate={isPubHovered ? { y: 0 } : scrollAnimation}
                  className="space-y-4"
                >
                  {filteredInsights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 pr-4"
                    >
                      <span className="text-sm text-gray-500 whitespace-nowrap min-w-[100px]">
                        {format(new Date(item.date), "dd/MM/yyyy")}
                      </span>
                      <div>
                        <Link
                          href={`/publications/${item.slug}`}
                          className="text-blue-600 hover:underline cursor-pointer break-words block"
                        >
                          {item.title}
                        </Link>
                        {/* <p className="text-sm text-gray-600 mt-1"> */}
                        {/*   {item.description} */}
                        {/* </p> */}
                        {/* {item.attachment && ( */}
                        {/*   <a */}
                        {/*     href={item.attachment} */}
                        {/*     target="_blank" */}
                        {/*     rel="noopener noreferrer" */}
                        {/*     className="text-sm text-blue-500 hover:underline mt-1 block" */}
                        {/*   > */}
                        {/*     Download Attachment */}
                        {/*   </a> */}
                        {/* )} */}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
            <div className="mt-4 text-right text-white">
              Updated Till : {format(new Date(), "dd/MM/yyyy")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

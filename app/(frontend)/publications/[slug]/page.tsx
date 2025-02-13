"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getInsight } from "@/app/actions/getInsight";
import { format } from "date-fns";

export default function UnionBudget2025({
  params,
}: {
  params: { slug: string };
}) {
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInsight(params.slug);
        setInsight(data);
      } catch (error) {
        console.error("Error fetching insight:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [params.slug]);

  const handleDownload = () => {
    if (insight?.attachmentUrl) {
      window.open(insight.attachmentUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Insight not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-8 pt-24">
      {/* Banner */}
      <div className="bg-[#0B3861] text-white py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {insight.title}
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Thumbnail */}
            <div className="relative h-[300px] w-full">
              <img
                src={insight.imageUrl}
                alt={insight.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-gray-600 mb-4">
                {format(new Date(insight.date), "MMMM d, yyyy")}
              </div>

              <p className="text-gray-800 mb-8">{insight.description}</p>

              <p className="text-gray-800 mb-8">
                To read the highlights, please click on the download button
                below:
              </p>

              <div className="flex justify-center mb-8">
                <Button
                  onClick={handleDownload}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-2 rounded"
                >
                  Download
                </Button>
              </div>

              <div className="text-sm text-gray-600 mb-8">
                <p className="font-semibold mb-2">DISCLAIMER:</p>
                <p>{insight.disclaimer}</p>
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-end space-x-4">
                <Button variant="outline" size="icon">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

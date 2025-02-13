"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Target, Shield, BarChart } from 'lucide-react';

interface ServiceItem {
  title: string;
  description?: string;
  subItems?: string[];
}

interface ServiceSection {
  title: string;
  content?: string;
  layout: "grid" | "list" | "table";
  items?: ServiceItem[];
}

interface ServiceData {
  name: string;
  banner: string;
  description: string;
  sections: ServiceSection[];
}

const GridLayout = ({ items }: { items: ServiceItem[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item, idx) => (
      <motion.div
        key={idx}
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        {item.description && (
          <p className="text-gray-600">{item.description}</p>
        )}
      </motion.div>
    ))}
  </div>
);

const ListLayout = ({ items }: { items: ServiceItem[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((item, idx) => (
      <motion.div
        key={idx}
        className="flex items-start space-x-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
      >
        <span className="text-blue-500">→</span>
        <div>
          <span className="font-medium">{item.title}</span>
          {item.description && (
            <p className="text-gray-600 mt-1">{item.description}</p>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);

const TableLayout = ({ items }: { items: ServiceItem[] }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
            Items
          </th>
          {items.length > 0 &&
            items[0].subItems?.map((_, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border">
                Category {idx + 1}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border">
              {item.title}
            </td>
            {item.subItems?.map((subItem, subIdx) => (
              <td key={subIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border">
                {subItem}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ServicePage: React.FC<{ service: ServiceData }> = ({ service }) => {
  const paragraphs = service.description
    .split(/(?<=\.)\s+/)
    .filter((para) => para.trim().length > 0);

  const borderColors = [
    "border-blue-500",
    "border-purple-500",
    "border-emerald-500",
    "border-amber-500",
    "border-rose-500",
  ];

  // Color palette for headings
  const colors = [
    "from-blue-600 to-cyan-500",
    "from-purple-600 to-pink-500",
    "from-emerald-600 to-teal-500",
    "from-orange-600 to-amber-500",
    "from-indigo-600 to-blue-500",
    "from-rose-600 to-pink-500",
    "from-teal-600 to-emerald-500",
    "from-violet-600 to-purple-500",
  ];

  // Get color for index, cycling through array if needed
  const getColor = (index: number) => colors[index % colors.length];

  const borderColor = "border-blue-500";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-80 w-full">
        <Image
          src={service.banner}
          alt={service.name}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 flex items-center justify-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {service.name}
          </motion.h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-6xl mx-auto space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              className={`bg-white rounded-lg shadow-lg p-6 border-l-4 ${borderColor}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex gap-4">
                <ArrowRight className="w-6 h-6 flex-shrink-0 mt-1 text-blue-500" />
                <p className="text-lg text-gray-700 leading-relaxed">
                  {paragraph.trim()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Service Sections - Wrapped in Container */}
      <div className="container mx-auto px-4 lg:px-48">
        <div className="space-y-12 mb-8">
          {service?.sections?.map((section, idx) => (
            <motion.div
              key={idx}
              className={`bg-white rounded-lg shadow-lg p-6 space-y-6 hover:shadow-xl transition-shadow duration-300 ${
                section.layout === "table" ? "overflow-x-auto" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2
                className={`text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${getColor(
                  idx
                )} pb-3 border-b`}
              >
                {section.title}
              </h2>
              {section.content && (
                <p className="text-gray-700">{section.content}</p>
              )}

              {section.items && (
                <>
                  {section.layout === "grid" && (
                    <GridLayout items={section.items} />
                  )}
                  {section.layout === "list" && (
                    <ListLayout items={section.items} />
                  )}
                  {section.layout === "table" && (
                    <TableLayout items={section.items} />
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;

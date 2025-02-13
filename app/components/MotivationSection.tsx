import { motion } from "framer-motion";

export default function MotivationalQuote() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-purple-100 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          className="relative max-w-4xl mx-auto px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Quote content */}
          <div className="mb-8">
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif leading-relaxed text-gray-800">
              The quintessence of success lies not in the ephemeral pursuit of
              wealth, but in the perpetual quest for excellence.
            </blockquote>
          </div>

          {/* Author info with line */}
          <motion.div
            className="flex justify-end items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-[2px] bg-blue-500"
            />
            <cite className="not-italic">
              <span className="block text-lg font-serif text-blue-700">
                Arthur Schopenhauer
              </span>
            </cite>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FixedEnquiryButton = () => {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link href="/query">
        <motion.button
          className="bg-orange-400 text-gray-800 px-4 py-3 rounded-full font-semibold hover:bg-orange-500 transition-colors duration-300 flex items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="mr-2" size={20} />
          Any Questions?
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FixedEnquiryButton;
